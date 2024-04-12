async function pay(id){
    let data  = {id: parseInt(id)};
    console.log(data);
    const res = await fetch("/pay", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        alert("Fee is charged!");
        window.location.href = "/pay";
    }
}