let nameParticipant;
let chatmessages = [];
const typeStatus = "status";
const typeMessage = "message";
const typePrivateMessage = "private_message";
let interval = null;
let intervalMessage = null;

function askUser() {

    nameParticipant = { name: prompt("Olá! Qual o seu nome?") };

    const participants = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameParticipant);

    participants.then(successfulRequest);
    participants.catch(notsuccessfulRequest);
    console.log(nameParticipant);

}
askUser()

function searchStatus() {

    const statusInChat = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nameParticipant);

}

function successfulRequest() {
    console.log("A sua requisição foi completada com sucesso!");
    interval = setInterval(searchStatus, 5000);
    intervalMessage = setInterval(getMessage, 3000);
}

function notsuccessfulRequest(error) {
    const response = error.response.status;
    console.log(response);
    if (response == 400) {
        askUser();
    }

}

function getMessage() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then((message) => { showChatUpdate(message) });
    promise.catch(notsuccessfulRequest);
}

function showChatUpdate(returned) {

    let main = document.querySelector("main");

    main.innerHTML = "";

    let last = "";

    for (let i = 0; i < returned.data.length; i++) {

        if (i === returned.data.length - 1) {

            last = "last";
        }

        if (returned.data[i].type == typeStatus) {

            main.innerHTML += `
        
        <div class=" backgroundChatStatus ${last} ${returned.data.type}">
        <p class="time">(${returned.data[i].time})</p>
        <p class="sender"><b>${returned.data[i].from}</b></p>
        <p class="text">${returned.data[i].text}</p>
      </div>`;


        } else if (returned.data[i].type == typeMessage) {

            main.innerHTML += `
        
            <div class=" backgroundChatPublicMessage ${last} ${returned.data.type}">
            <p class="time">(${returned.data[i].time})</p>
            <p class="sender"><b>${returned.data[i].from}</b></p>
            <p>para</p>
            <p class="recipient"><b>${returned.data[i].to}</b>:</p>
            <p class="text">${returned.data[i].text}</p>
          </div>`;

        } else if (returned.data[i].type == typePrivateMessage) {

            main.innerHTML += `
        
            <div class=" backgroundChatPrivateMessage ${last} ${returned.data.type}">
            <p class="time">(${returned.data[i].time})</p>
            <p class="sender"><b>${returned.data[i].from}</b></p>
            <p>reservadamente para</p>
            <p class="recipient"><b>${returned.data[i].to}</b>:</p>
            <p class="text">${returned.data[i].text}</p>
          </div>`;

        }

    }

    const element = document.querySelector(".last");
    element.scrollIntoView();

}

function sendMessages() {

    let textParticipant = document.querySelector("footer input").value;
    console.log(textParticipant);

    const myChatInfo = {
        from: nameParticipant.name,
        to: "Todos",
        text: textParticipant,
        type: "message"
    };

    const myMessages = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", myChatInfo);
    myMessages.then(clearMessages);
    myMessages.catch(notsuccessfulRequest);

}

function clearMessages() {
    let footer = document.querySelector("footer");
    footer.innerHTML = `
        <div id="contents-footer">
            <input type="text" class="answer" placeholder="Escreva aqui..." />
            <ion-icon onclick="sendMessages()" name="paper-plane-outline"></ion-icon>
        </div>`
}