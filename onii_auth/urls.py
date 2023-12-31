from django.urls import path

from onii_auth.views import add_user, logout_user, signin_page, signup_page

app_name = "onii_auth"

urlpatterns = [
    path('signup', signup_page, name="signup_page"),
    path('signin', signin_page, name="signin_page"),
    path('add_user', add_user, name="add_user"),
    path('logout', logout_user, name="logout_user"),
]
