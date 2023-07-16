import json
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from main.models import UserData, Users
from .indicators import *

# initialize connection to our
# email server, we will use gmail here
smtp = smtplib.SMTP('smtp-mail.outlook.com', 587)
smtp.ehlo()
smtp.starttls()

email_format: str = r"(^[a-zA-Z0-9'_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"

# Login with your email and password

with open("oauth/credentials.json") as file:
    creds = json.load(file)
    smtp.login(creds["mail"], creds["password"])


# send our email message 'msg' to our boss
def send_mail(to, code):
    # build message contents
    msg = MIMEMultipart()

    # Add Subject
    msg['Subject'] = "Snippet Store Verification"
    msg["Content-type"] = "text/html"
    # Add text contents
    msg.attach(MIMEText('''<h3>Click to verify your email, If not requested by you kindly ignore</h3>''', "html"))

    msg.attach(MIMEText(f'''<button style="
    background: lime;
    border: none;
    height: 40px;
"><a style="color: beige; font-weight: bold" href="http://localhost:8000/{code}"> Click me </a></button>''', "html"))
    try:
        smtp.sendmail(to_addrs=to, from_addr='snipperstore@outlook.com', msg=msg.as_bytes())
        return True
    except:
        return False


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
