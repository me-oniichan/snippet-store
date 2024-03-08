from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.http.request import HttpRequest
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from .models import Users
# Create your views here.



def user_exist(user) -> bool:
    """
    Check if a user exists in the database.

    Args:
        user: The user object to check.

    Returns:
        bool: True if the user exists, False otherwise.
    """
    if Users.objects.filter(id = user.id).exists():
        return True
    return False

def home(request: HttpRequest):
    """
    Render the home page.

    Args:
        request: The HTTP request object.

    Returns:
        HttpResponse: The rendered home page.
    """
    if user_exist(request.user):
        return render(request, template_name="index.html")
    return render(request, template_name="index.html")

def signup(request: HttpRequest):
    if request.method == 'GET':
        '''Let User sign up'''
        #redirect if user is already logged in
        if user_exist(request.user):
            return redirect("/")
        return render(request, template_name='signup.html')

    try:
        user = Users.objects.create_user(
            username=request.POST['username'],
            password=request.POST['password'], 
            email=request.POST["email"]
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


def login_user(request: HttpRequest):
    if request.method == 'GET':
        '''Let User login'''
        #redirect if user is already logged in
        if user_exist(request.user):
            return redirect("/")
        return render(request, template_name="login.html")

    user = authenticate(username = request.POST["username"], password = request.POST["password"])
    print(user)
    if user:
        login(request,user)
        return redirect("/")
    return JsonResponse({
        "message": "not ok"
    }, status=401)


@login_required(redirect_field_name="/")
def logout_user(request):
    """
    Logout the user.

    Args:
        request: The HTTP request object.

    Returns:
        HttpResponse: The redirect response after logout.
    """
    try:
        logout(request)
    except Exception as err:
        print(err)
        return HttpResponse("something unexpected happen")
    return redirect("/")
