let participantStatus = [];
let nameParticipant;

/*let messages = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');*/

function askUser() {

    nameParticipant = {name: prompt("Olá! Qual o seu nome?")};

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


