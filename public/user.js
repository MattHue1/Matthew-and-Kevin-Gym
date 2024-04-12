async function user() {
    let user = document.getElementById("user").value;
    let userInfo = {"username": user};

    const res = await fetch("/username", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        alert("Username Change!");
        window.location.href = "/user";
    }
}

async function pass() {
    let pass = document.getElementById("pass").value;
    let userInfo = {"pass": pass};

    const res = await fetch("/pass", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        alert("Password Change!");
        window.location.href = "/user";
    }
}

async function goal() {
    let goal = document.getElementById("goal").value;
    let userInfo = {"goal": goal};

    const res = await fetch("/goal", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        alert("Goal Change!");
        window.location.href = "/user";
    }
}

async function health_metrics() {
    let health_metrics = document.getElementById("health_metrics").value;
    let userInfo = {"health_metrics": health_metrics};

    const res = await fetch("/health_metrics", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        alert("Health Metrics Change!");
        window.location.href = "/user";
    }
}