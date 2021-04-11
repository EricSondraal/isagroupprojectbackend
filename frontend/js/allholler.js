let hollers = [];

window.addEventListener('DOMContentLoaded', getHollers);

function getHollers() {
    let fetchHoller = new Promise(resolve => {
        let xmlUsers = new XMLHttpRequest();
        xmlUsers.open("GET", `${apiURL}users`);
        xmlUsers.setRequestHeader("x-api-key", apiKey);
        xmlUsers.onreadystatechange = () => {
            if (xmlUsers.readyState === XMLHttpRequest.DONE && xmlUsers.status === 200) {
                let response = JSON.parse(xmlUsers.responseText);
                console.log("Got names");
                response.names.forEach(name => {
                    resolve(name);
                });
            }
        }
        xmlUsers.send();
    }).then(name => {
        let xmlCount = new XMLHttpRequest();
        xmlCount.open("GET", `${apiURL}postcount/${name}`);
        xmlCount.setRequestHeader("x-api-key", apiKey);
        xmlCount.onreadystatechange = () => {
            if (xmlCount.readyState === XMLHttpRequest.DONE && xmlCount.status === 200) {
                let response = JSON.parse(xmlCount.responseText);
                console.log("Got counts");
                return new Promise(resolve => {
                    resolve(name, response.postcount);
                });

            }
        }
        xmlCount.send();
    }).then((name, count) => {
        for (let i = 0; i < count; i++) {
            let xmlGetHoller = new XMLHttpRequest();
            xmlGetHoller.open("GET", `${apiURL}getcomment/${name}/${i}`);
            xmlGetHoller.setRequestHeader('x-api-key', apiKey);
            xmlGetHoller.onreadystatechange = () => {
                if (xmlGetHoller.readyState === XMLHttpRequest.DONE && xmlGetHoller.status === 200) {
                    let response = JSON.parse(xmlGetHoller.responseText);
                    console.log("Got posts");
                    console.log(response);
                }
            }
            xmlGetHoller.send();
        }
    });
}

function showHollers() {
    hollers.push(new Holler("me", "testing", "this should work please", true));
    hollers.forEach(element => {
        document.getElementById("hollerSpace").appendChild(element.display());
    });
}