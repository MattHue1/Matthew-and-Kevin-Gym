async function newAcc() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let goal = document.getElementById("goal").value;
    let health_metrics = document.getElementById("health_metrics").value;
    let userInfo = {"username": user, "password": pass, "goal": goal, "health_metrics": health_metrics};

    const res = await fetch("/user", {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    document.getElementById('formErrors').innerHTML = "";
    document.getElementById('formErrors').classList.remove('hide');

    if(res.ok){
        alert("New account created succefully!");
        window.location.href = "/user";
    }else{
        let text = await res.text();
        document.getElementById('formErrors').innerHTML += text;
        document.getElementById("user").classList.add('error');
    }
}