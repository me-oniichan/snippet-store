const elem_ = document.getElementById("con-showpass");
const passelem_ = document.getElementById("con-password");
let showpass_ = false;

elem_.addEventListener("click", () => {
    if (showpass_) {
        showpass_ = false;
        passelem_.setAttribute("type", "password");
        elem_.setAttribute("src", "../static/oauth/eye-open.png");
    } else {
        showpass_ = true;
        passelem_.setAttribute("type", "text");
        elem_.setAttribute("src", "../static/oauth/eye-closed.png");
    }
});

const formHandler = () => {
    let conditions = [0, 0, 0, 0];

    const regex = new RegExp("^[a-zA-Z0-9'_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
    const emailerror = document.getElementById("email-warn");
    const emailinput = document.getElementById("email");

    emailinput.addEventListener("focusout", () => {
        const value = emailinput.value;
        if (!regex.test(value)) {
            emailerror.innerHTML = "Invalid email format";
            conditions[0] = 0;
        } else {
            emailerror.innerHTML = " ";
            fetch("/oauth/verify_email/" + value).then((resp) => {
                if (resp.status === 409) {
                    emailerror.innerText = "Email not available";
                    conditions[0] = 0;
                } else if (resp.status === 400) {
                    emailerror.innerHTML = "Invalid email format";
                    conditions[0] = 0;
                } else {
                    emailerror.innerText = " ";
                    conditions[0] = 1;
                }
            });
        }
    });

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-warn");

    passwordInput.addEventListener("focusout", () => {
        if (passwordInput.value.length < 8 || passwordInput.value.length > 64) {
            passwordError.innerText = "Password length must be between 8 and 64";
            conditions[1] = 0;
        } else {
            passwordError.innerText = "";
            conditions[1] = 1;
        }
    });

    const conPasswordInput = document.getElementById("con-password");
    const conPasswordError = document.getElementById("con-password-warn");

    conPasswordInput.addEventListener("focusout", () => {
        if (passwordInput.value === conPasswordInput.value) {
            conPasswordError.innerText = "";
            conditions[2] = 1;
        } else {
            conditions[2] = 0;
            conPasswordError.innerText = "Does not match with password";
        }
    });

    const usernameInput = document.getElementById("username")
    const usernameError = document.getElementById("username-warn")
    const userRegExp = new RegExp("^[A-Za-z0-9_-]*$")

    usernameInput.addEventListener("focusout", ()=>{
        usernameInput.value = usernameInput.value.trim()
        if(usernameInput.value.length > 15){
            conditions[3]=0;
            usernameError.innerText = "username can have atmax 15 characters"
            return;
        }else if(userRegExp.test(usernameInput.value)){
            usernameError.innerText = ""
            fetch("/oauth/verify_username/"+usernameInput.value).then(res=>{
                if(res.ok){
                    conditions[3]=1
                }else{
                    conditions[3]=0
                    usernameError.innerText = "username not available"
                }
            })
        }else{
            conditions[3]=0
            usernameError.innerText = "username can only have alphabets, numbers and underscores"
        }
        
    })

    document.getElementById("submit").addEventListener("click", ()=>{
        if(conditions.every(elem=>(elem!=0))){
            document.getElementById("signup-form").requestSubmit()
        }
    })
};

formHandler();
