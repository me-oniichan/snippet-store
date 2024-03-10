from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Users

class CustomAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active', 'is_superuser', 'display_name')
    search_fields = ('username', 'email')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Users, CustomAdmin)
# add firelds to admin panel
