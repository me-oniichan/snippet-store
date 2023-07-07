import hashlib
import uuid
import utils

from django.http import JsonResponse

from main.models import Users, UserData
from .models import VerifySlugs


def new_user(request):
    name = request.username
    password = request.password
    salt = uuid.uuid4().hex
    unique_id = uuid.uuid5(uuid.NAMESPACE_URL, name)
    hash_ = hashlib.sha256((password + salt).encode("utf-8")).hexdigest()

    email_code = uuid.uuid5(uuid.NAMESPACE_URL, request.email)

    user_entry = Users(unique_name=name, unique_id=unique_id)
    user_data = UserData(unique_id=unique_id, email=request.email, salt=salt, verified=False, password=hash_,
                         display_name=request.displayname)
    mailcode = VerifySlugs(user_name=name, verifycode=email_code)

    user_entry.save()
    user_data.save()
    mailcode.save()

    #TODO: send email verification
    utils.send_mail(request.email, mailcode)


    response = {
        "result": "Success",
        "status": 200
    }

    return JsonResponse(response)
