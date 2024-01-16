from django.urls import path
from onii_auth.views import add_user, logout_user, login_page, signup_page

app_name = "onii_auth"

urlpatterns = [
    path('signup', signup_page, name="signup_page"),
    path('signin', login_page, name="signin_page"),
    path('add_user', add_user, name="add_user"),
    path('logout', logout_user, name="logout_user"),
]