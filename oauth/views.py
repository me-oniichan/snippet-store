import hashlib
import uuid
import oauth.utils as utils

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from main.models import Users, UserData
from .models import VerifySlugs


def auth_home(request):
    return render(template_name="signup.html", request=request)


def check_username(request, name):
    if Users.objects.filter(unique_name=name).exists():
        return JsonResponse({
            "message": "username exist"
        }, status=403)
    return JsonResponse({
        "message": "username available"
    }, status=200)


def check_email(request, email):
    if (UserData.objects.filter(email=email).exists()):
        return JsonResponse({
            "message": "already exist"
        }, status=403)
    return JsonResponse({
        "message": "available"
    }, status=200)


def update_mail(request):
    username = request.POST["name"]
    password = request.POST["password"]
    email = request.POST["email"]
    try:
        user = Users.objects.get(unique_name=username)
        salt = UserData.objects.get(unique_id=user).salt
        password = hashlib.sha256((password+salt).encode('utf-8')).hexdigest()

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
    name = request.POST["username"]

    if not Users.objects.filter(unique_name=name).exists() and not UserData.objects.filter(
            email=request.POST["email"]).exists():
        password = request.POST["password"]
        salt = uuid.uuid4().hex
        unique_id = uuid.uuid5(uuid.NAMESPACE_URL, name).hex
        hash_ = hashlib.sha256((password + salt).encode("utf-8")).hexdigest()

        email_code = name + uuid.uuid5(uuid.NAMESPACE_URL, request.POST["email"]).hex

        user_entry = Users(unique_name=name, unique_id=unique_id)
        user_data = UserData(unique_id=user_entry, email=request.POST["email"], salt=salt, verified=False,
                             password=hash_,
                             display_name=request.POST["displayname"])
        mailcode = VerifySlugs(user_id=user_entry, verifycode=email_code)

        user_entry.save()
        user_data.save()
        mailcode.save()

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
        return JsonResponse({
            "message": "username exists",
            "status": 403
        })


def verify_email(request, email_code):
    try:
        print(email_code)
        db_data = VerifySlugs.objects.get(verifycode=email_code)
        user = UserData.objects.get(unique_id=db_data.user_id)
        user.verified = True
        db_data.delete()
        user.save()
        return JsonResponse({
            "message": "success",
            "status": 200
        })

    except VerifySlugs.DoesNotExist:
        print("does not exist")
        return JsonResponse({
            "message": "does not exist",
            "status": 404
        })
    except Exception as e:
        print(e)

    return HttpResponse("done")
