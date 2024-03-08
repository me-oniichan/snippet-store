from django.urls import path
from onii_auth.views import login_user, logout_user, signup

app_name = "onii_auth"

urlpatterns = [
    path('signup', signup, name="signup"),
    path('login', login_user, name="login"),
    path('logout', logout_user, name="logout_user"),
]
