document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('message-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
  
    const socket = new WebSocket('ws://localhost:3000');
  
    socket.addEventListener('open', () => {
      console.log('Connected to server');
    });
  
    socket.addEventListener('message', (event) => {
      const message = event.data;
      appendMessage(message);
    });
  
    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      if (message.trim() !== '') {
        sendMessage(message);
        messageInput.value = '';
      }
    });
  
    function sendMessage(message) {
      socket.send(message);
    }
  
    function appendMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      messageContainer.appendChild(messageElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  });
  