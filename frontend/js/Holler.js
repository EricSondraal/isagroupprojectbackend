function Holler(postNum, user, title, body, isPersonal) {
    this.postNum = postNum;
    this.user = user;
    this.title = title;
    this.body = body;
    this.isPersonal = isPersonal;

    this.containerDiv;
    this.display = () => {
        this.containerDiv = document.createElement("div");
        this.containerDiv.setAttribute("class", "card");

        let bodyDiv = document.createElement("div");
        bodyDiv.setAttribute("class", "card-body");

        let cardTitle = document.createElement("h4");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.innerHTML = this.title;

        let cardUser = document.createElement("h6");
        cardUser.setAttribute("class", "card-subtitle mb-2 text-muted");
        cardUser.innerHTML = this.user;

        let cardBody = document.createElement("p");
        cardBody.setAttribute("class", "card-text");
        cardBody.innerHTML = this.body;

        bodyDiv.appendChild(cardTitle);
        bodyDiv.appendChild(cardUser);
        bodyDiv.appendChild(cardBody);
        this.containerDiv.appendChild(bodyDiv);

        if (isPersonal) {
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("class", "card-link");
            deleteButton.innerHTML = "Delete";
            deleteButton.onclick = this.delete;

            bodyDiv.appendChild(deleteButton);
        }

        return this.containerDiv;
    }

    this.delete = () => {
        let postObject = {
            name: this.user,
            postnumber: this.postNum
        };
        let xmlDelete = new XMLHttpRequest();
        xmlDelete.open("DELETE", `${apiURL}deletecomment`);
        xmlDelete.setRequestHeader('Content-Type', 'application/json');
        xmlDelete.setRequestHeader('x-api-key', apiKey);
        xmlDelete.onreadystatechange = () => {
            if (xmlDelete.readyState === XMLHttpRequest.DONE && xmlDelete.status === 200){
                location.reload();
            }
        }
        xmlDelete.send(JSON.stringify(postObject));
    }
}