let nameParticipant;
let participantChatInfo = [];
let chatmessages = [];
const typeStatus = "status";
const typeMessage = "message";
const typePrivateMessage = "private_message";

function askUser() {

    nameParticipant = { name: prompt("Olá! Qual o seu nome?") };

    const participants = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameParticipant);

    participants.then(successRequest);
    participants.catch(notSuccessRequest);
    console.log(nameParticipant);

}
askUser()

function searchStatus() {

    const statusInChat = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nameParticipant);
    statusInChat.then(successRequest);
    statusInChat.catch(notSuccessRequest);

}

setInterval(searchStatus, 5000)

function successRequest() {
    console.log("A sua requisição foi completada com sucesso!");
}

function notSuccessRequest(error) {
    const response = error.response.status;
    console.log(response);
    if (response == 400) {
        askUser();
    }

}

const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promise.then((message) => { showChatUpdate(message) });
promise.catch(notSuccessRequest);


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

}

