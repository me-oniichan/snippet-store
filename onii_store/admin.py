from django.contrib import admin

from onii_store.models import Snippets

admin.site.register(Snippets, admin.ModelAdmin)
