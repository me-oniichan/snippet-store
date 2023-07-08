import hashlib
import uuid
import oauth.utils as utils

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from main.models import Users, UserData
from .models import VerifySlugs


def auth_home(request):
    return render(template_name="signup.html", request=request)


def new_user(request):
    name = request.POST["username"]
    password = request.POST["password"]
    salt = uuid.uuid4().hex
    unique_id = uuid.uuid5(uuid.NAMESPACE_URL, name).hex
    hash_ = hashlib.sha256((password + salt).encode("utf-8")).hexdigest()

    email_code = name + uuid.uuid5(uuid.NAMESPACE_URL, request.POST["email"]).hex

    user_entry = Users(unique_name=name, unique_id=unique_id)
    user_data = UserData(unique_id=user_entry, email=request.POST["email"], salt=salt, verified=False, password=hash_,
                         display_name=request.POST["displayname"])
    mailcode = VerifySlugs(user_id=user_entry, verifycode=email_code)

    user_entry.save()
    user_data.save()
    mailcode.save()

    if utils.send_mail(request.POST["email"], f"oauth/verify/" + email_code):
        response = {
            "result": "Success",
            "status": 200
        }

    else:
        response = {
            "result": "couldn't mail",
            "status": 503
        }

    return JsonResponse(response)


def verify_email(request, email_code):
    try:
        print(email_code)
        db_data = VerifySlugs.objects.get(verifycode=email_code)
        user = UserData.objects.get(unique_id=db_data.user_id)
        user.verified = True
        db_data.delete()
        user.save()
        # db_data.save()
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
