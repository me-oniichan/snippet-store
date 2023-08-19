import hashlib
import uuid

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect, reverse

import oauth.utils as utils
from main.models import Users, UserData
from .indicators import *


def sign_up(request):
    if request.session.exists(request.session.session_key) and Users.objects.filter(unique_id=request.session["userid"]).exists():
        return redirect("/")
    return render(template_name="signup.html", request=request)


def check_username(request, name):
    """Check if username is available"""
    match utils.verify_username(name.strip().lower()):
        case Indicators.INVALID_FORMAT:
            return JsonResponse({
                "message": "Invalid Format"
            }, status=403)
        case Indicators.ALREADY_EXIST:
            return JsonResponse({
                "message": "username exist"
            }, status=403)
        case Indicators.DOES_NOT_EXIST:
            return JsonResponse({
                "message": "username available"
            }, status=200)


def check_email(request, email):
    """Check if email is valid"""
    match utils.verify_mail(email):
        case Indicators.INVALID_FORMAT:
            return JsonResponse({
                "message": "Invalid Format"
            }, status=400)
        case Indicators.ALREADY_EXIST:
            return JsonResponse({
                "message": "already exist"
            }, status=409)
        case Indicators.DOES_NOT_EXIST:
            return JsonResponse({
                "message": "available"
            }, status=200)


def new_user(request):
    """Signup new user"""
    name = request.POST["username"].strip().lower()
    email = request.POST["email"]
    password = request.POST["password"]

    if utils.verify_username(name) != Indicators.DOES_NOT_EXIST:
        return HttpResponse("Not quite right there")

    elif not utils.verify_password(password):
        return HttpResponse("Password doesn't seem to qualify")

    elif utils.verify_mail(email) != Indicators.DOES_NOT_EXIST:
        return HttpResponse("Cannot have same emails on multiple devices")

    # generate a salt
    salt = uuid.uuid4().hex
    unique_id = uuid.uuid5(uuid.NAMESPACE_URL, name).hex

    # hash password using salt
    hash_ = hashlib.sha256((password + salt).encode("utf-8")).hexdigest()

    # create database entry
    user_entry = Users(unique_name=name, unique_id=unique_id)
    user_data = UserData(unique_id=user_entry, email=request.POST["email"], salt=salt, verified=False,
                         password=hash_,
                         display_name=request.POST["display-name"])

    # save to database
    user_entry.save()
    user_data.save()

    request.session["userid"] = unique_id
    request.session.modified = True

    return redirect("/")

def login(request):
    if request.session.exists(request.session.session_key):
        unique_id = request.session["userid"]
        if Users.objects.filter(unique_id=unique_id).exists():
            return redirect("/")

    return render(template_name='login.html', request=request, context={"error_field": False})


def verifyLogin(request):
    user: str = request.POST["username"].strip().lower()
    password: str = request.POST["password"]
    try:
        user: Users = Users.objects.get(unique_name=user.strip())
        userdata = UserData.objects.get(unique_id=user)
        password = hashlib.sha256((password + userdata.salt).encode('utf-8')).hexdigest()
        userdata = UserData.objects.get(unique_id=user, password=password)
        request.session["userid"] = user.unique_id
        request.session.modified = True
        return redirect("/")

    except (Users.DoesNotExist, UserData.DoesNotExist):
        return render(template_name='login.html', request=request, context={"error_field": True})
