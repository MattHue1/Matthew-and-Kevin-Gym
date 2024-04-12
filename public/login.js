async function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let userInfo = {"user": user, "pass": pass};

    const res = await fetch("/login", {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        alert("Login Successful!");
        window.location.href = "/user";
    }else{
        alert("Login Failed");
        window.location.href = "/login";
    }
}