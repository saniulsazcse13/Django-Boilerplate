from django.urls import path
from users.views import GoogleLoginView, TokenRefreshView, LogoutView, UserProfileView

urlpatterns = [
    path('auth/google/', GoogleLoginView.as_view(), name='google-login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
]
