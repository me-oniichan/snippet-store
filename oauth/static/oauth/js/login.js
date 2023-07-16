const elem = document.getElementById("showpass")
const passelem = document.getElementById("password")
let showpass = false

elem.addEventListener("click", ()=>{
    if(showpass){
        showpass=false
        passelem.setAttribute("type", "password");
        elem.setAttribute("src", "../static/oauth/eye-open.png")
    }
    else{
        showpass=true
        passelem.setAttribute("type", "text")
        elem.setAttribute("src", "../static/oauth/eye-closed.png")
    }
})

const rotate = () =>{
    const bg = document.getElementById("bg")
    let deg = 0
    setInterval(()=>{
        deg = (deg+5)%360
        bg.style = `background: linear-gradient(${deg}deg, rgba(17, 25, 79, 0.91), rgba(173, 32, 78, 0.89));`
    }, 500)
}

rotate()