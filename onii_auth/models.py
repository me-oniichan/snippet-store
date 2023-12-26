from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Users(AbstractUser):
    last_name = None
    first_name = None
    display_name = models.CharField(max_length=30, blank=True)
