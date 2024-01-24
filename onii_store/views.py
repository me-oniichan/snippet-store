from curses import OK
from email import message
from telnetlib import STATUS
from turtle import title

from django.forms import ValidationError
from onii_auth.models import Users
from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from models import Snippets
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
# Create your views here.

def get_snippet(request: HttpRequest, snippet_id : str):
    '''Get a particular snippet using snippet id'''
    snippet = Snippets.objects.get(snippet_id = snippet_id);
    return JsonResponse({
        "author" : request.user.username,
        "snippet": {
            "language": snippet.language,
            "code": snippet.text,
            "title": snippet.title,
            "description": snippet.description,
            "create_date": str(snippet.create_date)
        }
    })

def get_user_snippets(request: HttpRequest, author: str):
    '''Get snippets for an User'''
    user = Users.objects.get(username=author)
    snippets = Snippets.objects.filter(author = user);
    response_data = {"snippets":[]}
    
    for snippet in snippets:
        response_data["snippets"].append({
            "language": snippet.language,
            "code": snippet.text,
            "title": snippet.title,
            "description": snippet.description,
            "create_date": str(snippet.create_date)
        })
    
    response_data["owned"] = user == request.user
    
    return JsonResponse(response_data)

@require_POST
@login_required
def save_snippet(request: HttpRequest):
    '''Save a users snippet to db'''
    snippet = request.POST["snippet"]
    
    try:
        snippet = Snippets.objects.create(title=snippet.title, code=snippet.code, desc = snippet.desc, author=request.user, language=snippet.language)
        
        return JsonResponse(status = 200)
    except ValidationError as err:
        return JsonResponse({"message":err.message}, status = 00)


@login_required
def delete_snippet(request: HttpRequest):
    '''Remove a Snippet from db'''
    pass 