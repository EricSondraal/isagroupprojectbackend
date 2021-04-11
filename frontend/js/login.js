let username;

window.addEventListener('DOMContentLoaded',(event)=>{
    if(typeof(Storage) == "undefined"){
        return;
    }
    username = sessionStorage.getItem("username");
    console.log(username);
    if (username) {
        document.getElementById("navProfile").innerHTML = `<a href="./profile.html">${username}</a>`;
    }
});

document.getElementById("loginForm").onsubmit = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    let credentials = {
        name: data.get('name'),
        password: data.get('password')
    };
    let xmlSignIn = new XMLHttpRequest();
    xmlSignIn.open("POST", `${apiURL}loginaccount`);
    xmlSignIn.setRequestHeader('Content-Type', 'application/json');
    xmlSignIn.setRequestHeader('x-api-key', apiKey);
    xmlSignIn.onreadystatechange = ()=>{
        if(xmlSignIn.readyState === XMLHttpRequest.DONE && xmlSignIn.status === 200){
            let response = JSON.parse(xmlSignIn.responseText);
            if(response.result === "success"){
                sessionStorage.setItem("username", credentials.name);
                location.reload();
            }
        }
    }
    xmlSignIn.send(JSON.stringify(credentials));
}