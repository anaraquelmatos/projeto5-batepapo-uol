let nameParticipant;
let participantChatInfo = {};


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
}

function catchMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(showChatUpdate);
    promise.catch(notSuccessRequest);

}

function catchPromise(answer) {
    console.log(answer);
    messages = answer.data;
}

function showChatUpdate(allInfos) {
    let sender;
    let recipient;
    let description;
    let type;
    let time;

    for (let i = 0; i < allInfos.data.length; i++) {

        time = allInfos.data[i].time;
        recipient = allInfos.data[i].to;
        description = allInfos.data[i].text;

    }

    if (nameParticipant.name) {
        const ul = document.querySelector("ul");
        ul.innerHTML += `

  <li><b>(${time})</b> para <b>${recipient}</b>: ${description}</li>
    
`;
    }
}

