from django.forms import ValidationError
from django.http.response import HttpResponseBadRequest
from onii_auth.models import Users
from django.http import HttpRequest, HttpResponseForbidden, HttpResponseNotFound, JsonResponse
from .models import Snippets
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required


def get_snippet(request: HttpRequest, snippet_id : int):
    '''Get a particular snippet using snippet id'''
    try:
        snippet = Snippets.objects.get(pk = snippet_id);
        return JsonResponse({
            "author" : request.user.username,
            "snippet": {
                "prefix": snippet.prefix,
                "language": snippet.language,
                "code": snippet.text,
                "title": snippet.title,
                "description": snippet.description,
                "create_date": str(snippet.create_date),
                "pk": snippet.pk,
                "owned": request.user == snippet.author
            }
        })
    except Snippets.DoesNotExist:
        return HttpResponseNotFound();

def get_user_snippets(request: HttpRequest, author: str):
    '''Get snippets for an User'''
    try:
        user = Users.objects.get(username=author)
        snippets = Snippets.objects.filter(author = user);
        response_data = {"snippets":[]}
        
        for snippet in snippets:
            response_data["snippets"].append({
                "pk": snippet.pk,
                "language": snippet.language,
                "code": snippet.text,
                "title": snippet.title,
                "description": snippet.description,
                "create_date": str(snippet.create_date),
                "prefix": snippet.prefix
            })
        
        return JsonResponse(response_data)
    except Users.DoesNotExist:
        return HttpResponseNotFound()

@require_POST
@login_required
def save_snippet(request: HttpRequest):
    '''Save a users snippet to db'''
    try:
        snippet = Snippets.objects.create(
            title=request.POST["title"],
            code=request.POST["code"],
            desc=request.POST["description"],
            author=request.user,
            language=request.POST["language"],
            prefix=request.POST["prefix"]
        )
        return JsonResponse({
            "title": snippet.title,
            "pk": snippet.pk,
            "created_date": snippet.create_date,
            "prefix": snippet.prefix,
            "language": snippet.language
        })
    except ValidationError as err:
        return JsonResponse({"message":err.messages}, status = 400)

@require_POST
@login_required
def delete_snippet(request: HttpRequest):
    '''Remove a Snippet from db'''
    try:
        snippet = Snippets.objects.get(pk = request.POST["snippet_id"])
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
            language = source_snippet.language,
            prefix = source_snippet.prefix,
            forked = source_snippet
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
    print(request.POST)
    try:
        snippet = Snippets.objects.get(pk = request.POST["pk"])
        if request.user != snippet.author:
            return HttpResponseForbidden()

        snippet.title = request.POST["title"]
        snippet.description = request.POST["description"]
        snippet.language = request.POST["language"]
        snippet.text = request.POST["code"]
        snippet.prefix = request.POST["prefix"]
        snippet.clean_fields()
        snippet.save()

        return JsonResponse({
            "messgae": "ok"
        })

    except Snippets.DoesNotExist:
        return HttpResponseNotFound()
    except ValidationError as verr:
        return HttpResponseBadRequest()
