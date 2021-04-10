const apiURL = "https://isagroupprojectbackend.herokuapp.com/API/v1/";

document.getElementById('adminlogin').onsubmit = (event)=>{
    event.preventDefault();
    let data = new FormData(event.target);
    let credentials = {
        name: data.get('name'),
        password: data.get('password')
    }
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${apiURL}adminlog`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200){
            document.getElementById('results').innerHTML = "";
            let responseLog = JSON.parse(xhttp.responseText);
            Object.entries(responseLog).forEach(([key, value]) => {
                let logEntry = document.createElement("p");
                logEntry.appendChild(document.createTextNode(`${key}: ${value}`));
                document.getElementById('results').appendChild(logEntry);
            });
        }
    }
    xhttp.send(JSON.stringify(credentials));
    document.getElementById('results').innerHTML = "Loading..."
}



