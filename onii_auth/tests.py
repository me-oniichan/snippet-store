from django.core.exceptions import ValidationError
from django.test import TestCase
from onii_auth.models import Users

from onii_auth.utils import password_validation, username_validation
# Create your tests here

class TestValidators(TestCase):
    def setUp(self) -> None:
        self.valid_username = "sample_uername123"
        self.invalid_username = "sample*username"
        self.mixcase_username = "SampleName"
        self.short_username = "us"
        self.long_username = "A very very very very very very long username to fit into db"

        self.valid_password = "somepassword1234"
        self.short_password = "short"
        self.long_password = "a very very very long password to fit into database"

    def test_username(self):
        self.assertIsNone(username_validation(self.valid_username))
        self.assertRaises(ValidationError, username_validation, self.invalid_username)
        self.assertRaises(ValidationError, username_validation, self.short_username)
        self.assertRaises(ValidationError, username_validation, self.long_username)

    def test_password(self):
        self.assertIsNone(password_validation(self.valid_password))
        self.assertRaises(ValidationError, password_validation, self.short_password)
        self.assertRaises(ValidationError, password_validation, self.long_password)    
