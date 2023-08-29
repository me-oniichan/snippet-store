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
        user = Users.objects.get(unique_id=getUser(request))
        code = data["code"]
        lang = data["language"]
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
    snipids = Snippets.objects.filter(unique_id=user)
    snips = [{
            "title" : data.title,
            "code" : data.text,
            "language" : data.language,
            "description": data.description,
            "forked_from": data.forked_from
        } for data in SnippetData.objects.filter(snippet_id__in=snipids)]

    response = {
        "username": user.unique_name,
        "displayname": displayname,
        "snippets" : snips,
    }

    return JsonResponse(response)


def getSnippet(request, snippetid):
    try:
        snipid  = Snippets.objects.get(snippet_id=snippetid)  
        data = SnippetData.objects.get(snippet_id=snipid)
        response = {
            "title" : data.title,
            "code" : data.text,
            "language" : data.language,
            "description": data.description,
            "forked_from": data.forked_from
        }
        return JsonResponse(response)

    except Snippets.DoesNotExist | SnippetData.DoesNotExist:
        return JsonResponse({
            "message": "could not find what you requested for"
        }, status= 404)

@csrf_exempt
def setSnippet(request):
    userid = getUser(request)
    print(request.body)
    return JsonResponse({
        "message": "success"
    })