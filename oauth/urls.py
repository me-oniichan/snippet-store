from django.urls import path
import oauth.views as views

app_name = "oauth"
urlpatterns = [
    path("", views.auth_home, name=""),
    path("signup/", views.new_user, name="signup"),
    path("verify/<str:email_code>", views.verify_email),
    path("verify_username/<str:name>", views.check_username),
    path("verify_email/<str:email>", views.check_email, name="verify_email"),
    path("login", views.verifyLogin),
]