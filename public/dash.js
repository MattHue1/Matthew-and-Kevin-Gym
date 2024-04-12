async function join(id, time,fee) {
    let userInfo = {"id": id, "time": time, "fee": parseFloat(fee)};

    const res = await fetch("/join", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        alert("Class Join!");
        window.location.href = "/dash";
    }
}