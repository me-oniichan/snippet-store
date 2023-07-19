import re

from main.models import UserData, Users
from .indicators import *

email_format: str = r"(^[a-zA-Z0-9'_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"


def verify_mail(email: str):
    """verify if email address has proper format and is on databse"""
    if not re.match(email_format, email, re.IGNORECASE):
        return Indicators.INVALID_FORMAT

    elif UserData.objects.filter(email=email, verified=True).exists():
        return Indicators.ALREADY_EXIST

    return Indicators.DOES_NOT_EXIST


def verify_password(password: str):
    if 64 < len(password) or len(password) < 8:
        return False
    return True


def verify_username(username: str):
    """Verify if username has correct format and is in database"""
    if len(username) > 15: return Indicators.INVALID_FORMAT
    for char in username:
        if not char.isalnum() and char != "_":
            return Indicators.INVALID_FORMAT

    if Users.objects.filter(unique_name=username).exists():
        return Indicators.ALREADY_EXIST

    return Indicators.DOES_NOT_EXIST