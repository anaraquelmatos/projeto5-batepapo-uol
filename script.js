function askUser() {

    let participant = prompt("Olá! Qual o seu nome?");

const nameParticipant = {

    name: participant

};

const participants = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameParticipant);

participants.then(showChat);
}
askUser()


