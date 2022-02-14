//Global variables
let nameParticipant;
let chatmessages = [];
const typeStatus = "status";
const typeMessage = "message";
const typePrivateMessage = "private_message";
let interval = null;
let intervalMessage = null;

//Function that send users' name to send to API
function toAccessMainScreen() {

    let nameUser = document.querySelector(".login input");

    nameParticipant = { name: nameUser.value }

    const participants = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameParticipant);
    participants.then(removeScreen);
    participants.catch(notsuccessfulRequest);

}

//Function that removes screen with user's login
function removeScreen() {
    let removeLoginScreen = document.querySelector(".login");
    removeLoginScreen.classList.add("hide");
    successfulRequest();

}

//Function that updates users' status to send to API
function searchStatus() {

    const statusInChat = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nameParticipant);

}

//Calls the functions to update them with times and checks if the request was successful
function successfulRequest() {
    console.log("A sua requisição foi completada com sucesso!");
    interval = setInterval(searchStatus, 5000);
    intervalMessage = setInterval(getMessage, 3000);
}

//Shows the errors found in the request
function notsuccessfulRequest(error) {
    const response = error.response.status;
    if (response === 400) {
        let enter = document.querySelector(".login input");
        enter.placeholder = "Tente outro nome";
        enter.value = "";
    }

}

//Get chat messages to show on the screen
function getMessage() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then((message) => { showChatUpdate(message) });
    promise.catch(notsuccessfulRequest);
}

//Function that shows each type of message
function showChatUpdate(returned) {

    let main = document.querySelector("main");

    main.innerHTML = "";

    let last = "";

    for (let i = 0; i < returned.data.length; i++) {

        if (i === returned.data.length - 1) {

            last = "last";
        }

        if (returned.data[i].type === typeStatus) {

            main.innerHTML += `
        
        <div data-identifier="message" class=" backgroundChatStatus ${last} ${returned.data.type}">
        <p class="time">(${returned.data[i].time})</p>
        <p class="sender"><b>${returned.data[i].from}</b></p>
        <p class="text">${returned.data[i].text}</p>
      </div>`;


        } else if (returned.data[i].type === typeMessage) {

            main.innerHTML += `
        
            <div data-identifier="message" class=" backgroundChatPublicMessage ${last} ${returned.data.type}">
            <p class="time">(${returned.data[i].time})</p>
            <p class="sender"><b>${returned.data[i].from}</b></p>
            <p>para</p>
            <p class="recipient"><b>${returned.data[i].to}</b>:</p>
            <p class="text">${returned.data[i].text}</p>
          </div>`;

        } else if (returned.data[i].type === typePrivateMessage && returned.data[i].to === nameParticipant.name) {

            main.innerHTML += `
        
            <div data-identifier="message" class=" backgroundChatPrivateMessage ${last} ${returned.data.type}">
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

//Function to send my own chat 
function sendMessages() {

    let textParticipant = document.querySelector("footer input").value;

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

//Function to clear the messages on input
function clearMessages() {
    let footer = document.querySelector("footer");
    footer.innerHTML = `
        <div id="contents-footer">
            <input class = "footer-input" type="text" class="answer" placeholder="Escreva aqui..." />
            <ion-icon data-identifier="send-message" onclick="sendMessages()" name="paper-plane-outline"></ion-icon>
        </div>`
}