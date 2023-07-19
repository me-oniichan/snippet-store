from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include, reverse

from main.views import home
from oauth.views import login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('oauth/', include("oauth.urls")),
    path('login/', login),
    path('signup/', lambda req: render(template_name='signup.html', request=req))
]

handler404 = "main.views.redirect_home"