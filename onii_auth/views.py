from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.http.request import HttpRequest
from django.http.response import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import redirect, render

from .models import Users
# Create your views here.

def home(request):
    return HttpResponse("<h1>This is home page</h1>")

def signup_page(request: HttpRequest):
    '''Let User sign up'''
    #redirect if user is already logged in
    if Users.objects.filter(id = request.user.id).exists():
        return HttpResponse(f"<h1>{request.user.username} you exist!!!</h1>")
    return render(request, template_name='signup.html')



def signin_page(request: HttpRequest):
    '''Let User login'''
    #redirect if user is already logged in
    if Users.objects.filter(id = request.user.id).exists():
        return HttpResponse(f"<h1>{request.user.username} you exist!!!</h1>")
    return render(request, template_name="login.html")


def add_user(request: HttpRequest):
    if request.method != "POST":
        HttpResponseBadRequest('Bad Request.')

    try:
        user = Users.objects.create_user(
            username=request.POST['username'],
            password=request.POST['password'], 
            email='somemail@some.gmail.com'
        )
        login(request, user)
        return JsonResponse({
            'access':'ok'
        })
        
        
    except ValidationError as err:
        print(err.messages)
        return JsonResponse({
            "message": err.messages
        }, status=400)


@login_required(redirect_field_name="/")
def logout_user(request) -> HttpResponse:
    try:
        logout(request)
    except Exception as err:
        print(err)
        return HttpResponse("something unexpected happen")
    return redirect("/")
