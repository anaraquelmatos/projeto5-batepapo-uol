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
promise.then((mensagem) => { showChatUpdate(mensagem) });
promise.catch(notSuccessRequest);


function showChatUpdate(returned) {

    for (let i = 0; i < returned.data.length; i++) {

        let main = document.querySelector("main");

        main.innerHTML += `
        
        <div class="status">
        <p class="time">(${returned.data[i].time})</p>
        <p class="sender"><b>${returned.data[i].from}</b></p>
        <p>para</p>
        <p class="recipient"><b>${returned.data[i].to}</b>:</p>
        <p class="text">${returned.data[i].text}</p>
      </div>`;

    }



}

