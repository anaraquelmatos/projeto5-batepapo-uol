let nameParticipant;
let myChatInfo = [];
let chatmessages = [];
const typeStatus = "status";
const typeMessage = "message";
const typePrivateMessage = "private_message";
let chatUpdate = false;

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
    statusInChat.then(successfulRequest);
    statusInChat.catch(notsuccessfulRequest);

}

setInterval(searchStatus, 5000)

function successfulRequest() {
    console.log("A sua requisição foi completada com sucesso!");
}

function notsuccessfulRequest(error) {
    const response = error.response.status;
    console.log(response);
    if (response == 400) {
        askUser();
    }

}

const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promise.then((message) => { showChatUpdate(message) });
promise.catch(notsuccessfulRequest);


function showChatUpdate(returned) {


    for (let i = 0; i < returned.data.length; i++) {

        let main = document.querySelector("main");

        if (returned.data[i].type == typeStatus) {

            main.innerHTML += `
        
        <div class=" backgroundChatStatus ${returned.data.type}">
        <p class="time">(${returned.data[i].time})</p>
        <p class="sender"><b>${returned.data[i].from}</b></p>
        <p class="text">${returned.data[i].text}</p>
      </div>`;


        }

        if (returned.data[i].type == typeMessage) {

            main.innerHTML += `
        
            <div class=" backgroundChatPublicMessage ${returned.data.type}">
            <p class="time">(${returned.data[i].time})</p>
            <p class="sender"><b>${returned.data[i].from}</b></p>
            <p>para</p>
            <p class="recipient"><b>${returned.data[i].to}</b>:</p>
            <p class="text">${returned.data[i].text}</p>
          </div>`;

        }

        if (returned.data[i].type == typePrivateMessage) {

            main.innerHTML += `
        
            <div class=" backgroundChatPrivateMessage ${returned.data.type}">
            <p class="time">(${returned.data[i].time})</p>
            <p class="sender"><b>${returned.data[i].from}</b></p>
            <p>reservadamente para</p>
            <p class="recipient"><b>${returned.data[i].to}</b>:</p>
            <p class="text">${returned.data[i].text}</p>
          </div>`;

        }

    }

    const element = document.querySelector('main div');
    element.scrollIntoView();

}



function sendMessages() {

    let textParticipant = document.querySelector("footer input").value;
    console.log(textParticipant);

    const myMessages = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", myChatInfo);
    myMessages.then(availableMessages);
    myMessages.catch(notsuccessfulRequest);

    myChatInfo = {
        from: nameParticipant,
        to: "Todos",
        text: textParticipant,
        type: "message"
    };

}