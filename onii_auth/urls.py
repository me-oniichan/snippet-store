from django.urls import path

from onii_auth.views import add_user, logout_user, signup

app_name = "onii_auth"

urlpatterns = [
    path('signup', signup, name="signup"),
    path('add_user', add_user, name="add_user"),
    path('logout', logout_user, name="logout_user"),
]
