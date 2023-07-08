import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json

# initialize connection to our
# email server, we will use gmail here
smtp = smtplib.SMTP('smtp-mail.outlook.com', 587)
smtp.ehlo()
smtp.starttls()

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
