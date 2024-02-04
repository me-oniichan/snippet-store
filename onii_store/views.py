from django.forms import ValidationError
from django.http.response import HttpResponseBadRequest, HttpResponseNotAllowed
from onii_auth.models import Users
from django.shortcuts import render
from django.http import HttpRequest, HttpResponseForbidden, HttpResponseNotFound, JsonResponse
from .models import Snippets
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
# Create your views here.

def get_snippet(request: HttpRequest, snippet_id : str):
    '''Get a particular snippet using snippet id'''
    snippet = Snippets.objects.get(pk = snippet_id);
    return JsonResponse({
        "author" : request.user.username,
        "snippet": {
            "language": snippet.language,
            "code": snippet.text,
            "title": snippet.title,
            "description": snippet.description,
            "create_date": str(snippet.create_date),
            "owned": request.user == snippet.author
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
    
    
    return JsonResponse(response_data)

@require_POST
@login_required
def save_snippet(request: HttpRequest):
    '''Save a users snippet to db'''
    try:
        snippet = Snippets.objects.create(
            title=request.POST["title"],
            code=request.POST["code"],
            desc=request.POST["desc"],
            author=request.user,
            language=request.POST["language"]
        )
        print(snippet.author.username) 
        return JsonResponse({
            "message": "ok"
        })
    except ValidationError as err:
        return JsonResponse({"message":err.message}, status = 400)

@require_POST
@login_required
def delete_snippet(request: HttpRequest):
    '''Remove a Snippet from db'''
    try:
        snippet = Snippets.objects.get(pk = request.POST["snippet_id"])
        print(snippet.author.username)
        if snippet.author != request.user:
            return HttpResponseForbidden()

        snippet.delete()
        return JsonResponse({
            "message": "ok"
        })
    except Snippets.DoesNotExist:
        return HttpResponseNotFound()


@require_POST
@login_required
def fork(request: HttpRequest):
    '''Fork a snippet from another user'''
    try:
        source_snippet = Snippets.objects.get(pk = request.POST["source_id"])
        target_snippet = Snippets.objects.create(
            title=source_snippet.title,
            code=source_snippet.text,
            desc=source_snippet.description,
            author = request.user,
            language = source_snippet.language
        )
        
        return JsonResponse({
            "message": "ok",
            "snippet_id": target_snippet.pk
        })

    except Snippets.DoesNotExist:
        return HttpResponseNotFound()

@require_POST
@login_required
def edit_snippet(request: HttpRequest):
    '''Edit a snippet in db'''
    try:
        snippet = Snippets.objects.get(pk = request.POST["snippet_id"])
        if request.user != snippet.author:
            return HttpResponseForbidden()

        snippet.title = request.POST["title"]
        snippet.description = request.POST["description"]
        snippet.language = request.POST["language"]
        snippet.text = request.POST["code"]
        snippet.clean_fields()
        snippet.save()

        return JsonResponse({
            "messgae": "ok"
        })

    except Snippets.DoesNotExist:
        return HttpResponseNotFound()
    except ValidationError as verr:
        return HttpResponseBadRequest() 
