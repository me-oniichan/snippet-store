from django.contrib import admin

from .models import *

# Register your models here.


admin.site.register(Users)
admin.site.register(UserData)
admin.site.register(Snippets)
admin.site.register(SnippetData)