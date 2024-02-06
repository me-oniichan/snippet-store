from django.db import models
import datetime
from onii_auth.models import Users
# Create your models here.

class SnippetManager(models.Manager):
    def create(self, title: str, code: str, author: Users, language: str, desc: str = ""):
        snippet: Snippets = self.model(author=author, title=title, text=code, language=language, description=desc)
        snippet.save()
        return snippet

class Snippets(models.Model):
    author = models.ForeignKey("onii_auth.Users", on_delete=models.CASCADE)  # one-to-many relation
    title = models.CharField(max_length=50, db_index=True)
    text = models.TextField(default="")
    language = models.CharField(max_length=10, default="txt")
    description = models.TextField(default="")
    forked_from = models.CharField(max_length=15, null=True)
    create_date = models.DateField(default=datetime.datetime.now, editable=False, null=False)

    objects = SnippetManager()
