from django.db import models
import datetime
# Create your models here.
class Snippets(models.Model):
    unique_id = models.ForeignKey("onii_auth.Users", on_delete=models.CASCADE)  # one-to-many relation
    snippet_id = models.CharField(max_length=15, unique=True, db_index=True)


class SnippetData(models.Model):
    snippet_id = models.OneToOneField("Snippets", on_delete=models.CASCADE, primary_key=True)
    title = models.CharField(max_length=50, db_index=True)
    text = models.TextField(default="")
    language = models.CharField(max_length=10)
    description = models.TextField(default="")
    forked_from = models.CharField(max_length=15, null=True)
    create_date = models.DateField(default=datetime.datetime.now, editable=False, null=False)