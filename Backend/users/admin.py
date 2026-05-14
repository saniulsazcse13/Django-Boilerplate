from django.contrib import admin
from users.models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'google_id', 'created_at']
    list_filter = ['role']
    search_fields = ['user__email', 'google_id']
    readonly_fields = ['id', 'created_at', 'updated_at']
