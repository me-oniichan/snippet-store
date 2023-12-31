from django.urls import path

import oauth.views as views

app_name = "oauth"
urlpatterns = [
    path("", views.sign_up, name=""),
    path("signup/", views.new_user, name="signup"),
    path("verify_username/<str:name>", views.check_username),
    path("verify_email/<str:email>", views.check_email, name="verify_email"),
    path("login", views.verifyLogin),
]
