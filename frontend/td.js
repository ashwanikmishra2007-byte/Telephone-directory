let show = document.querySelector("#resultin");

document.querySelector("#add").addEventListener("click", async function(e) {
    e.preventDefault();
    console.log("Form submitted");
    const data =  await addToDirectory();
    console.log(data);
    await sendData(data);
    const result = await sendData(data);
    console.log(result);
    show.textContent = result.result || result.error;
});

document.querySelector("#delete").addEventListener("click", async function(e){
    e.preventDefault();
    console.log("Delete button clicked");
    const data = await deleteFromDirectory();
    console.log(data);
    const result = await sendDeleteRequest(data);
    show.textContent = result.result || result.error;
});

async function deleteFromDirectory() {
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    return {name:name, phone:phone};
}

async function sendDeleteRequest(data) {
    const response =  await fetch("http://localhost:3000/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log("Delete request sent to server");
    const result = await response.json();
    console.log(result);
    return result;
}


async function addToDirectory() {
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    return {name:name, phone:phone};
}

async function sendData(data) {
    const response =  await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log("Data sent to server");
    const result = await response.json();
    console.log(result);
    return result;
}