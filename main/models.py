import datetime

from django.db import models


class Users(models.Model):
    unique_name = models.CharField(max_length=15, unique=True, editable=False, primary_key=True)
    unique_id = models.CharField(unique=True, max_length=32)


class UserData(models.Model):
    unique_id = models.OneToOneField("Users", on_delete=models.CASCADE, to_field="unique_id", primary_key=True)
    display_name = models.CharField(max_length=25)
    password = models.CharField(max_length=64)
    email = models.EmailField(max_length=50)
    verified = models.BooleanField(default=False)
    salt = models.CharField(max_length=50)


class Snippets(models.Model):
    unique_id = models.ForeignKey("Users", on_delete=models.CASCADE, to_field="unique_id")  # one-to-many relation
    snippet_id = models.CharField(max_length=15, unique=True, db_index=True)


class SnippetData(models.Model):
    snippet_id = models.ForeignKey("Snippets", on_delete=models.CASCADE, to_field="snippet_id")
    title = models.CharField(max_length=50, db_index=True)
    text = models.TextField(default="")
    language = models.CharField(max_length=10)
    description = models.TextField(default="")
    forked_from = models.CharField(max_length=15, null=True)


class SnippetInfo(models.Model):
    snippet_id = models.ForeignKey("Snippets", on_delete=models.CASCADE, to_field="snippet_id")
    create_date = models.DateField(default=datetime.datetime.now, editable=False, null=False)
