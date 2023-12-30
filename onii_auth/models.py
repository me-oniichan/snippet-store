from django.core.validators import validate_email
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

from onii_auth.utils import password_validation, username_validation

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, username, password, email, display_name=''):
        email = self.normalize_email(email)
        validate_email(email)
        password_validation(password)
        username_validation(username)
        
        user: Users = self.model(username=username, display_name=display_name)
        user.set_password(password)
        user.save() 
        return user

class Users(AbstractUser):
    last_name = None
    first_name = None
    display_name = models.CharField(max_length=30, blank=True)
    objects: UserManager = UserManager()
