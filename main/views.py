import json

from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from main.models import Users, Snippets, SnippetData
import uuid


def home(request):
    if request.session.exists(request.session.session_key):
        unique_id = request.session["userid"]
        try:
            user = Users.objects.get(unique_id=unique_id)
            return render(request, "dashboard.html", context={"username": user.unique_name})
        except Users.DoesNotExist:
            pass
    return render(request, "index.html")


def redirect_home(request, exception):
    print(exception)
    return redirect(reverse("home"))


def create(request):
    if not request.session.exists(request.session.session_key):
        redirect("/")

    return render(request, "create.html")


@csrf_exempt
def save_snippet(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = Users.objects.get(unique_id=request.session["userid"])
        code = data["code"]
        lang = data["lang"]
        title = data["title"]

        if not len(code):
            return JsonResponse({"message": "editor is empty"}, status=400)
        elif not len(title):
            return JsonResponse({"message": "title is empty"}, status=400)

        snippet_id = uuid.uuid4().hex

        snippet = Snippets(unique_id=user, snippet_id=snippet_id)
        snippet_data = SnippetData(snippet_id=snippet, title=title, language=lang, text=code,
                                   description=data["description"])
        snippet.save()
        snippet_data.save()

        return redirect("/")
