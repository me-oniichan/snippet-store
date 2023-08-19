import json

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from main.models import Users, Snippets, SnippetData, UserData
import uuid


def home(request):
    if request.session.exists(request.session.session_key):
        unique_id = request.session["userid"]
        try:
            user = Users.objects.get(unique_id=unique_id)
            return user_dashboard(request)
        except Users.DoesNotExist:
            pass
    return render(request, "index.html")


def redirect_home(request, exception):
    print(exception)
    return redirect(reverse("home"))


def create(request):
    if not request.session.exists(request.session.session_key):
        redirect("/login")

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

        return JsonResponse({"message": "done"})


def user_dashboard(request):
    try:
        print("processing")
        user = Users.objects.get(unique_id=request.session["userid"])
        snippet_ids = Snippets.objects.filter(unique_id=user)
        snippets = SnippetData.objects.filter(snippet_id__in=snippet_ids)
        return render(request, "dashboard.html", context={
            "snippets": snippets,
            "username" : user.unique_name
        })
    except Users.DoesNotExist:
        return render(request, "index.html")

def getUser(request):
    try:
        return request.session["userid"]
    except:
        return Users.objects.get(unique_name="oniibhai").unique_id


def getData(request):
    userid = getUser(request)

    user = Users.objects.get(unique_id=userid)
    #double db hit req
    displayname = UserData.objects.get(unique_id=user).display_name
    snips = [snip.snippet_id for snip in Snippets.objects.filter(unique_id=user)]

    response = {
        "username": user.unique_name,
        "displayname": displayname,
        "snippets" : snips,
    }

    return JsonResponse(response)
    