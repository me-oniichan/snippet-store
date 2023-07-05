from django.db import models
from main.models import Users
# Create your models here.


class VerifySlugs(models.Model):
    user_name = models.ForeignKey("main.Users", unique=True, on_delete=models.CASCADE)
    verifycode = models.CharField(max_length=50)
