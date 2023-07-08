from django.urls import path
import oauth.views as views

app_name = "oauth"
urlpatterns = [
    path("", views.auth_home, name=""),
    path("adduser/", views.new_user, name="signup")
]