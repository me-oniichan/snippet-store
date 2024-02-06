from django.http import response
from django.test import Client, TestCase

# Create your tests here.

class SnipetOperationAsLogedInUser(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.username = "test_user"
        self.password = "test_password"
        self.email = "test@email.com"
        self.display_name = "test_display_name"
        self.key = 0

        self.client.post("/add_user", {
            "username" : self.username,
            "password" : self.password,
            "email" : self.email,
            "display_name" : self.display_name
        })

         

    def test_save_for_valid_snippet(self):
        response = self.client.post("/onii-store/save", data={
            "title": "Sample Snippet",
            "desc" : "Sample Description",
            "language": "rust",
            "code": '''
            fn main(){
                println!("Sample code");
            }
            '''
        })

        self.assertEqual(200, response.status_code)
        self.key = response.json()["snippet_id"]
    
    def test_get_user_snippets(self):
        self.test_save_for_valid_snippet()
        response = self.client.get("/onii-store/get-user-snippets/test_user")
        
        self.assertEqual(response.status_code, 200)


    def test_get_snigular_valid_snippet(self):
        self.test_save_for_valid_snippet()
        response = self.client.get("/onii-store/get-snippet/"+str(self.key))
        self.assertEqual(response.status_code, 200)
    
    def test_get_snigular_invalid_snippet(self):
        self.test_save_for_valid_snippet()
        response = self.client.get("/onii-store/get-snippet/"+"99999")
        self.assertEqual(response.status_code, 404)
    
    def test_delete_valid_snippet(self):
        self.test_save_for_valid_snippet()
        response = self.client.post("/onii-store/delete", data={"snippet_id": 1})
        self.assertEqual(response.status_code, 200)

    def test_delete_invalid_snippet(self):
        response = self.client.post("/onii-store/delete", data={"snippet_id": 1})
        self.assertEqual(response.status_code, 404)

class SnipetOperationAsAnonymusUser(TestCase):
    def setUp(self):
        self.username = "test_user"
        self.password = "test_password"
        self.client = Client()

    def test_save(self):
        response = self.client.post("/onii-store/save", data={
            "title": "Sample Snippet",
            "desc" : "Sample Description",
            "language": "rust",
            "code": '''
            fn main(){
                println!("Sample code");
            }
            '''
        })

        self.assertEqual(response.status_code, 401)
