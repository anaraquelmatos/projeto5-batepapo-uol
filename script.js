let nameParticipant;
let chatmessages = [];
const typeStatus = "status";
const typeMessage = "message";
const typePrivateMessage = "private_message";
let chatUpdate = false;
let interval = null;

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
   // statusInChat.then(successfulRequest);
  //  statusInChat.catch(notsuccessfulRequest);

}



function successfulRequest() {
    console.log("A sua requisição foi completada com sucesso!");
    interval = setInterval(searchStatus, 5000);
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

  const myChatInfo = {
        from: nameParticipant.name,
        to: "Todos",
        text: textParticipant,
        type: "message"
    };

    const myMessages = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", myChatInfo);
   // myMessages.then(availableMessages);
   // myMessages.catch(notsuccessfulRequest);

  //  console.log(myChatInfo);
 
}