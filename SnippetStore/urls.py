from django.contrib import admin
from django.urls import path, include

from main.views import *
from oauth.views import login, sign_up

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('oauth/', include("oauth.urls")),
    path('oauth/', include("main.urls")),
    path('login/', login),
    path('signup/', sign_up),

    path('create', create),
    path('submit_snippet', save_snippet),
    path("get_data", getData)
]

handler404 = "main.views.redirect_home"