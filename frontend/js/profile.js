window.addEventListener('DOMContentLoaded', (event) => {
    if (username) {
        let profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `<h4>${username}</h4>`
        
        //Add number of posts label
        let postCount = document.createElement("h4");
        postCount.innerHTML = "Number of posts: ";
        profileInfo.appendChild(postCount);

        //Add delete form and submit handler.
        let deleteForm = document.createElement("form");
        
        let deletePassword = document.createElement("input");
        deletePassword.setAttribute("type", "password");
        deletePassword.setAttribute("name", "password");
        
        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "submit");
        deleteButton.setAttribute("value", "Delete account");

        deleteForm.appendChild(deletePassword);
        deleteForm.appendChild(deleteButton);
        deleteForm.onsubmit = (event) => {
            event.preventDefault();
            let data = new FormData(event.target);
            let accountInfo = {
                name: username,
                password: data.get("password")
            };
            let xmlDelete = new XMLHttpRequest();
            xmlDelete.open("DELETE", `${apiURL}deleteaccount`);
            xmlDelete.setRequestHeader('Content-Type', 'application/json');
            xmlDelete.setRequestHeader('x-api-key', apiKey);
            xmlDelete.onreadystatechange = () =>{
                if(xmlDelete.readyState === XMLHttpRequest.DONE && xmlDelete.status === 200){
                    sessionStorage.clear();
                    location.reload();
                }
            }
            xmlDelete.send(JSON.stringify(accountInfo));
        }
        profileInfo.appendChild(deleteForm);

        //Get the number of posts from the user.
        let xmlCount = new XMLHttpRequest();
        xmlCount.open("GET", `${apiURL}postcount/${username}`);
        xmlCount.setRequestHeader("x-api-key", apiKey);
        xmlCount.onreadystatechange = () =>{
            if(xmlCount.readyState === XMLHttpRequest.DONE && xmlCount.status === 200){
                let response = JSON.parse(xmlCount.responseText);
                console.log(response);
                postCount.innerHTML += `<a href="./myholler.html">${response.postcount}</a>`;
            }
        }
        xmlCount.send();
    }
});

document.getElementById("signupForm").onsubmit = event => {
    event.preventDefault();
    let data = new FormData(event.target);
    let credentials = {
        name: data.get('name'),
        password: data.get('password')
    };
    let xmlSignUp = new XMLHttpRequest();
    xmlSignUp.open("POST", `${apiURL}createaccount`);
    xmlSignUp.setRequestHeader('Content-Type', 'application/json');
    xmlSignUp.onreadystatechange = () => {
        if (xmlSignUp.readyState === XMLHttpRequest.DONE && xmlSignUp.status === 200) {
            let response = JSON.parse(xmlSignUp.responseText);
            if (response.result === "success") {
                sessionStorage.setItem("username", credentials.name);
                location.reload();
            }
        }
    }
    xmlSignUp.send(JSON.stringify(credentials));
}