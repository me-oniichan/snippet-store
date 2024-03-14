from django.db import models
import datetime
from onii_auth.models import Users
from onii_store.utils import validate_code, validate_prefix, validate_title
# Create your models here.

class SnippetManager(models.Manager):
    def create(self, title: str, code: str, author: Users, language: str, prefix: str,desc: str = "", forked = None):
        snippet: Snippets = self.model(
            author=author,
            title=title,
            text=code,
            language=language,
            description=desc,
            prefix=prefix,
            forked_from=forked
        )
        snippet.clean_fields()
        snippet.save()
        return snippet

class Snippets(models.Model):
    author = models.ForeignKey("onii_auth.Users", on_delete=models.CASCADE)  # one-to-many relation
    prefix = models.CharField(max_length=10, validators=[validate_prefix], default="snip", blank=True)
    title = models.CharField(max_length=50, db_index=True, validators=[validate_title])
    text = models.TextField(validators=[validate_code], default="")
    language = models.CharField(max_length=10, default="txt")
    description = models.TextField(default="", blank=True)
    forked_from = models.CharField(max_length=15, null=True, blank=True, default=None)
    create_date = models.DateField(default=datetime.datetime.now, editable=False, null=False)

    objects = SnippetManager()
