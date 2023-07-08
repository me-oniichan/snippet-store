from django.db import models
from main.models import Users
# Create your models here.


class VerifySlugs(models.Model):
    user_id = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True, to_field="unique_id", db_column="user_id")
    verifycode = models.CharField(max_length=50)