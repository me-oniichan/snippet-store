from django.urls import path
from .views import delete_snippet, edit_snippet, fork, get_snippet, get_user_snippets, save_snippet

app_name = "onii-store"

urlpatterns = [
    path('save', save_snippet, name="save-snippet"),
    path('delete', delete_snippet, name="delete-snippet"),
    path('fork', fork, name="fork"),
    path('edit', edit_snippet, name="edit-snippet"),
    path('get-snippet', get_snippet, name="get-snippet"),
    path('get-user-snippets/<str:author>', get_user_snippets, name="get-user-snippets")
]
