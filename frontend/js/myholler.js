let hollers = [];

window.addEventListener('DOMContentLoaded', () => {
    if (username) {
        //Create holler list and form for new ones.
        document.getElementById("hollerSpace").innerHTML =
            `<div id="addForm" class="float-right mx-5 mt-5">
            <h4>Send a new Holler!</h4>
            <form id="newHollerForm">
                <input type="text" name="hollertitle" placeholder="Holler Title">
                <br>
                <textarea rows="3" cols="50" name="hollertext"></textarea>
                <br>
                <input type="submit" value="Holler!">
            </form>
        </div>
        <ul id="myHollers">
            <li>Loading Hollers...</li>
        </ul>`;
        document.getElementById("newHollerForm").onsubmit = submitHoller;
        getHollers();
    }
});

function submitHoller(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let hollerData = {
        name: username,
        title: data.get("hollertitle"),
        body: data.get("hollertext")
    };
    console.log(hollerData);
    let xmlHoller = new XMLHttpRequest();
    xmlHoller.open("POST", `${apiURL}newcomment`);
    xmlHoller.setRequestHeader('Content-Type', 'application/json');
    xmlHoller.setRequestHeader('x-api-key', apiKey);
    xmlHoller.onreadystatechange = () => {
        if (xmlHoller.readyState === XMLHttpRequest.DONE && xmlHoller.status === 200) {
            let response = JSON.parse(xmlHoller.responseText);
            if (response.result === "success") {
                console.log(response);
                getHollers();
            }
        }
    }
    xmlHoller.send(JSON.stringify(hollerData));
}

function getHollers() {
    let fetchHoller = new Promise(resolve => {
        let xmlCount = new XMLHttpRequest();
        xmlCount.open("GET", `${apiURL}postcount/${username}`);
        xmlCount.setRequestHeader("x-api-key", apiKey);
        xmlCount.onreadystatechange = () => {
            if (xmlCount.readyState === XMLHttpRequest.DONE && xmlCount.status === 200) {
                let response = JSON.parse(xmlCount.responseText);
                resolve(response.postcount);
            }
        }
        xmlCount.send();
    }).then(result => {
        let myHollers = document.getElementById("myHollers");
        if (result > 0) {
            myHollers.innerHTML = "";
            for (let i = 0; i < result; i++) {
                let xmlGetHoller = new XMLHttpRequest();
                xmlGetHoller.open("GET", `${apiURL}getcomment/${username}/${i}`);
                xmlGetHoller.setRequestHeader('x-api-key', apiKey);
                xmlGetHoller.onreadystatechange = () => {
                    if (xmlGetHoller.readyState === XMLHttpRequest.DONE && xmlGetHoller.status === 200){
                        let response = JSON.parse(xmlGetHoller.responseText);
                        let h = new Holler(i, username, response.title, response.body, true);
                        myHollers.appendChild(h.display());
                    }
                }
                xmlGetHoller.send();
            }
        } else {
            myHollers.innerHTML = "No Hollers";
        }
    });
}