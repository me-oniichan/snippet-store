import hashlib
import uuid
import oauth.utils as utils
from .indicators import *
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from main.models import Users, UserData
from .models import VerifySlugs


def auth_home(request):
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


def update_mail(request):
    username: str = request.POST["name"].strip().lower()
    password = request.POST["password"]
    email = request.POST["email"]

    match utils.verify_mail(email):
        case Indicators.INVALID_FORMAT:
            return JsonResponse({
                "message": "Invalid Format"
            }, status=403)
        case Indicators.ALREADY_EXIST:
            return JsonResponse({
                "message": "already exist"
            }, status=403)

    try:
        user = Users.objects.get(unique_name=username)
        salt = UserData.objects.get(unique_id=user).salt
        password = hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

        if UserData.objects.filter(unique_id=user, password=password).exists():
            email_code = username + uuid.uuid5(uuid.NAMESPACE_URL, request.POST["email"]).hex
            UserData(unique_id=user, email=email).save()
            VerifySlugs(user_id=user, verifycode=email_code).save()

            if utils.send_mail(request.POST["email"], f"oauth/verify/" + email_code):
                response = {
                    "result": "Success",
                }
                return JsonResponse(response, status=200)

            else:
                response = {
                    "result": "couldn't mail",
                }
                return JsonResponse(response, status=503)
        else:
            JsonResponse({
                "message": "Password validation failed"
            }, status=403)

    except Users.DoesNotExist:
        return JsonResponse({
            "message": "user does not exist",
        }, status=404)


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

    # generate a email code
    email_code = name + uuid.uuid5(uuid.NAMESPACE_URL, request.POST["email"]).hex

    # create database entry
    user_entry = Users(unique_name=name, unique_id=unique_id)
    user_data = UserData(unique_id=user_entry, email=request.POST["email"], salt=salt, verified=False,
                         password=hash_,
                         display_name=request.POST["display-name"])
    mailcode = VerifySlugs(user_id=user_entry, verifycode=email_code)

    # save to database
    user_entry.save()
    user_data.save()
    mailcode.save()

    # send email
    utils.send_mail(email, f"oauth/verify/" + email_code)

    # TODO: add styling to this response
    return HttpResponse("<h1>Check you inbox to verify email</h1>")


def verify_email(request, email_code):
    try:
        db_data = VerifySlugs.objects.get(verifycode=email_code)
        user = UserData.objects.get(unique_id=db_data.user_id)
        if UserData.objects.filter(email=user.email, verified=True).exists():
            return HttpResponse("<h1>Seems like this email is already associated with an existing account</h1>")

        user.verified = True
        db_data.delete()
        user.save()
        return JsonResponse({
            "message": "success",
            "status": 200
        })

    except VerifySlugs.DoesNotExist:
        return JsonResponse({
            "message": "does not exist",
            "status": 404
        })
    except Exception as e:
        print(e)

    return HttpResponse("done")


def login(request):
    return render(template_name='login.html', request=request, context={"error_field": False})


def verifyLogin(request):
    user: str = request.POST["username"].strip().lower()
    password: str = request.POST["password"]
    try:
        user: Users = Users.objects.get(unique_name=user.strip())
        userdata = UserData.objects.get(unique_id=user)
        password = hashlib.sha256((password + userdata.salt).encode('utf-8')).hexdigest()
        userdata = UserData.objects.get(unique_id=user, password=password)
        return HttpResponse(f"Logged in as user id {userdata.unique_id.unique_id}")
    except (Users.DoesNotExist, UserData.DoesNotExist):
        return render(template_name='login.html', request=request, context={"error_field": True})