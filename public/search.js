async function search(){
    let name = document.getElementById("name").value;
    let data = {"name": name};
    const res = await fetch("/search", {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if(res.ok){
        let user = await res.json();
        let result = document.getElementById("middle");
        result.innerHTML += `<div class = "review"><h3>Result:</h3><h3>Name: ${user.user_name}</h3><h3>Goal: ${user.goal}</h3><h3>Health Metrics: ${user.health_metrics}</h3></div>`;
    }
}