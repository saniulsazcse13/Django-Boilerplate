from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication as BaseJWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests


class GoogleAuthService:
    @staticmethod
    def verify_google_token(id_token_str):
        try:
            CLIENT_ID = settings.GOOGLE_OAUTH_CLIENT_ID
            if not CLIENT_ID:
                raise AuthenticationFailed('Google OAuth client ID not configured')

            id_info = id_token.verify_oauth2_token(
                id_token_str,
                google_requests.Request(),
                CLIENT_ID
            )

            if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise AuthenticationFailed('Invalid token issuer')

            return id_info
        except Exception as e:
            raise AuthenticationFailed(f'Google token verification failed: {str(e)}')


class JWTAuthentication(BaseJWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request)
        except AuthenticationFailed:
            raise
        except Exception:
            raise AuthenticationFailed('Invalid or expired token')
