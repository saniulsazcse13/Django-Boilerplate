from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import UserProfile


class Command(BaseCommand):
    help = 'Set a user as admin by email'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='User email to set as admin')

    def handle(self, *args, **options):
        email = options['email']
        try:
            user = User.objects.get(email=email)
            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.role = 'admin'
            profile.save()
            self.stdout.write(self.style.SUCCESS(f'User {email} is now an admin'))
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'User with email {email} not found'))
