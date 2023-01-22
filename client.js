
const socket = io('http://localhost:8000',{
    transports: ['websocket', 'polling', 'flashsocket'],
  });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('usermsg');
const messageContainer = document.querySelector('.chatbox')

const audio = new Audio('./ting.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=='left'){
        audio.play();
    }

}

function Exit_Window(){
    if (confirm("Close Window?")) {
      window.close();
    }
  }
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you:${message}`,'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const username = prompt("enter your name to join the chat");

socket.emit('new-user-joined',username);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right');
})

socket.on('receive', data=>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on('left', res=>{
    append(`${res.data} left the chat`,'left');
})
