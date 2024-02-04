from django.test import Client, TestCase

# Create your tests here.

class SnipetOperationAsLogedInUser(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.username = "test_user"
        self.password = "test_password"
        self.email = "test@email.com"
        self.display_name = "test_display_name"

        response = self.client.post("/add_user", {
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
    
    def test_get_user_snippets(self):
        self.test_save_for_valid_snippet()
        response = self.client.get("/onii-store/get-user-snippets/test_user")
        
        self.assertEqual(response.status_code, 200)

        print(response.json())
