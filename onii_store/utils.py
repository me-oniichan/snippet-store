from django.core.exceptions import ValidationError
def validate_code(code: str):
    if code: return None
    raise ValidationError(message="empty code not allowed")

def validate_title(title: str):
    if len(title) < 3: raise ValidationError(message="Title must have length 3 or above")
