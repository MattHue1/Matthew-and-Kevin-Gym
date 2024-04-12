async function update(){
    let id = document.getElementById("class").options[document.getElementById("class").selectedIndex].value;
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;  
    let fee = document.getElementById("fee").value;
    let room = document.getElementById("room").options[document.getElementById("room").selectedIndex].value;
    let data  = {id: parseInt(id), name: name, date: date, time: time, fee: fee, room: parseInt(room)};
    console.log(data);
    const res = await fetch("/schdule", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        alert("Schdule is updated!");
        window.location.href = "/changeSchdule";
    }
}

async function remove(){
    let id = document.getElementById("class1").options[document.getElementById("class1").selectedIndex].value;
    let data  = {id: parseInt(id)};
    console.log(data);
    const res = await fetch("/schdule", {  
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        alert("Schdule is Removed!");
        window.location.href = "/changeSchdule";
    }
}

