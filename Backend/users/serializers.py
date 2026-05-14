from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'avatar', 'google_id', 'role', 'created_at', 'updated_at']


class GoogleAuthSerializer(serializers.Serializer):
    id_token = serializers.CharField(required=True, help_text='Google ID token from the client')


class TokenResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    user = UserProfileSerializer()
