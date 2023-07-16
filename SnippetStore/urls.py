from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render
from main.views import home
from oauth.views import login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('oauth/', include("oauth.urls")),
    path('login/', login),
    path('signup/', lambda req: render(template_name='signup.html', request=req))
]
