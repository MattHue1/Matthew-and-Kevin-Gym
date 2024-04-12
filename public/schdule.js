async function add(){
    let name = document.getElementById("name").value;
    let time = document.getElementById("time").value;
    let fee = document.getElementById("fee").value;
    let date = document.getElementById("date").value;
    let room = document.getElementById("room");
    console.log(room.options[room.selectedIndex].value);
    let data = {"name": name, "time": time, "fee": parseFloat(fee), "date": date, "room": room.options[room.selectedIndex].value};
    const res = await fetch("/class", {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if(res.ok){
        alert("Class Added!");
        window.location.href = "/dash";
    }
}