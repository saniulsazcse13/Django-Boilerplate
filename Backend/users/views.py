from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from drf_spectacular.utils import extend_schema, OpenApiResponse

from users.models import UserProfile
from users.serializers import (
    GoogleAuthSerializer,
    TokenResponseSerializer,
    RefreshTokenSerializer,
    LogoutSerializer,
    UserProfileSerializer,
)
from users.authentication import GoogleAuthService


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

        return Response(
            {
                'access': tokens['access'],
                'refresh': tokens['refresh'],
                'user': profile_serializer.data,
            },
            status=status.HTTP_200_OK,
        )


@method_decorator(csrf_exempt, name='dispatch')
class TokenRefreshView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(
        request=RefreshTokenSerializer,
        responses={
            200: OpenApiResponse(description='Token refreshed successfully'),
            401: OpenApiResponse(description='Invalid or expired refresh token'),
        },
        tags=['Authentication'],
    )
    def post(self, request):
        serializer = RefreshTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh = RefreshToken(serializer.validated_data['refresh'])
            access = str(refresh.access_token)
            return Response(
                {'access': access},
                status=status.HTTP_200_OK,
            )
        except TokenError:
            return Response(
                {'error': 'Invalid or expired refresh token'},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=LogoutSerializer,
        responses={
            200: OpenApiResponse(description='Logged out successfully'),
            400: OpenApiResponse(description='Bad request'),
        },
        tags=['Authentication'],
    )
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh = RefreshToken(serializer.validated_data['refresh'])
            refresh.blacklist()
            return Response(
                {'message': 'Logged out successfully'},
                status=status.HTTP_200_OK,
            )
        except TokenError:
            return Response(
                {'error': 'Invalid or expired refresh token'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except AttributeError:
            return Response(
                {'message': 'Logged out successfully'},
                status=status.HTTP_200_OK,
            )


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
