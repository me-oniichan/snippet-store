from django.test import Client, TestCase

# Create your tests here.

class SavingSnippets(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        response = self.client.post("/handle_login", {
            "username": "test_username",
            "password": "test_password"
        })

        if response.status_code == 302:
            print("Login Success")
        else:
            print("Couldn't Login, Terminating")
    
    def test_right_snippet_save(self):
        response = self.client.post("/")
