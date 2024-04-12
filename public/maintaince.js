async function fix(id){
    let data  = {id: parseInt(id)};
    console.log(data);
    const res = await fetch("/maintaince", {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        alert("Item is fixed!");
        window.location.href = "/maintaince";
    }
}