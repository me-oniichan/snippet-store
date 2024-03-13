from django.contrib.auth.decorators import login_required
from django.http.request import HttpRequest
from django.http.response import JsonResponse

from onii_store.models import Snippets


@login_required
def dashboard(request: HttpRequest):
    snippets = Snippets.objects.filter(author=request.user).defer('text', 'description', 'forked_from')
    res = {"snippets": [], "user" : request.user.username}
    for snippet in snippets:
        res["snippets"].append({
            "title": snippet.title,
            "pk": snippet.pk,
            "created_date": snippet.create_date,
            "prefix": snippet.prefix,
            "language": snippet.language
        })
    return JsonResponse(res)
