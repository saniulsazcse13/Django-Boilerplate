from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth.models import User
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from drf_spectacular.utils import extend_schema, OpenApiResponse

from users.models import UserProfile
from users.serializers import (
    GoogleAuthSerializer,
    TokenResponseSerializer,
    UserProfileSerializer,
)
from users.authentication import GoogleAuthService


REFRESH_TOKEN_COOKIE_NAME = 'refresh_token'


def _set_refresh_token_cookie(response, refresh_token):
    max_age = int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())
    response.set_cookie(
        key=REFRESH_TOKEN_COOKIE_NAME,
        value=refresh_token,
        max_age=max_age,
        httponly=True,
        secure=not settings.DEBUG,
        samesite='Lax',
        path='/api/',
    )


def _clear_refresh_token_cookie(response):
    response.delete_cookie(
        key=REFRESH_TOKEN_COOKIE_NAME,
        path='/api/',
    )


def _get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }


def _build_user_profile(user):
    try:
        profile = user.profile
    except UserProfile.DoesNotExist:
        profile = None
    return profile


@method_decorator(csrf_exempt, name='dispatch')
class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(
        request=GoogleAuthSerializer,
        responses={
            200: OpenApiResponse(response=TokenResponseSerializer, description='Login successful'),
            400: OpenApiResponse(description='Bad request'),
            401: OpenApiResponse(description='Invalid Google token'),
        },
        tags=['Authentication'],
    )
    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        id_token_str = serializer.validated_data['id_token']
        id_info = GoogleAuthService.verify_google_token(id_token_str)

        email = id_info.get('email')
        google_id = id_info.get('sub')
        first_name = id_info.get('given_name', '')
        last_name = id_info.get('family_name', '')
        avatar = id_info.get('picture', '')

        if not email:
            return Response(
                {'error': 'Email not provided by Google'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email,
                'first_name': first_name,
                'last_name': last_name,
            },
        )

        if created:
            UserProfile.objects.create(
                user=user,
                google_id=google_id,
                avatar=avatar,
            )
        else:
            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.google_id = google_id
            if avatar:
                profile.avatar = avatar
            profile.save()

            user.first_name = first_name or user.first_name
            user.last_name = last_name or user.last_name
            user.save()

        tokens = _get_tokens_for_user(user)
        profile = _build_user_profile(user)
        profile_serializer = UserProfileSerializer(profile)

        response = Response(
            {
                'access': tokens['access'],
                'user': profile_serializer.data,
            },
            status=status.HTTP_200_OK,
        )
        _set_refresh_token_cookie(response, tokens['refresh'])
        return response


@method_decorator(csrf_exempt, name='dispatch')
class TokenRefreshView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(
        responses={
            200: OpenApiResponse(description='Token refreshed successfully'),
            401: OpenApiResponse(description='Invalid or expired refresh token'),
        },
        tags=['Authentication'],
    )
    def post(self, request):
        refresh_token_str = request.COOKIES.get(REFRESH_TOKEN_COOKIE_NAME)
        if not refresh_token_str:
            return Response(
                {'error': 'Refresh token not provided'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token_str)
            access = str(refresh.access_token)

            try:
                refresh.blacklist()
            except AttributeError:
                pass
            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()
            new_refresh = str(refresh)

            response = Response({'access': access})
            _set_refresh_token_cookie(response, new_refresh)
            return response
        except TokenError:
            response = Response(
                {'error': 'Invalid or expired refresh token'},
                status=status.HTTP_401_UNAUTHORIZED,
            )
            _clear_refresh_token_cookie(response)
            return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            200: OpenApiResponse(description='Logged out successfully'),
            400: OpenApiResponse(description='Bad request'),
        },
        tags=['Authentication'],
    )
    def post(self, request):
        refresh_token_str = request.COOKIES.get(REFRESH_TOKEN_COOKIE_NAME)

        response = Response(
            {'message': 'Logged out successfully'},
            status=status.HTTP_200_OK,
        )
        _clear_refresh_token_cookie(response)

        if refresh_token_str:
            try:
                refresh = RefreshToken(refresh_token_str)
                refresh.blacklist()
            except TokenError:
                pass
            except AttributeError:
                pass

        return response


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            200: OpenApiResponse(response=UserProfileSerializer, description='User profile'),
            401: OpenApiResponse(description='Unauthorized'),
        },
        tags=['User'],
    )
    def get(self, request):
        profile = _build_user_profile(request.user)
        if not profile:
            return Response(
                {'error': 'User profile not found'},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
