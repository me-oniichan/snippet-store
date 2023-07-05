import uuid

from django.db import models


class Users(models.Model):
    unique_name = models.CharField(max_length=15, unique=True, editable=False, primary_key=True)
    unique_id = models.UUIDField(default=uuid.uuid4, unique=True)


class UserData(models.Model):
    unique_id = models.ForeignKey("Users", on_delete=models.CASCADE, to_field="unique_id", unique=True,
                                  primary_key=True)
    display_name = models.CharField(max_length=25)
    password = models.CharField(max_length=64)
    email = models.EmailField(max_length=50)
    verified = models.BooleanField(default=False)


class Snippets:
    unique_id = models.ForeignKey("Users", on_delete=models.CASCADE, to_field="unique_id")
    snippet_id = models.CharField(max_length=15)
