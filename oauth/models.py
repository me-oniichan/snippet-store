from django.db import models
from main.models import Users
# Create your models here.


class VerifySlugs(models.Model):
    user_name = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True, to_field="unique_name")
    verifycode = models.CharField(max_length=50)