const socket = io.connect('https://socket-io-experimental-chat.herokuapp.com/');

const form = document.querySelector('.message-form');
const userInput = document.querySelector('.user-input');
const messageInput = document.querySelector('.message-input');
const messagesBox = document.querySelector('.messages-container');
const typingBox = document.querySelector('.typing-placeholder');

socket.on('message', (data) => renderMessage(data));
socket.on('typing', (user) => renderTyping(user));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { username: e.target[0].value, message: e.target[1].value });
});
messageInput.addEventListener('keypress', () => {
  socket.emit('typing', userInput.value);
});

function renderMessage(message) {
  const template = `<li class="single-message"><span class="single-message__name">${message.username}:</span>
    <span class="single-message__text">${message.message}</span></li>`;
  document.querySelector('.typing-placeholder') && document.querySelector('.typing-placeholder').remove();
  messagesBox.insertAdjacentHTML('beforeend', template);
  scrollToBottom('.single-message');
}

function renderTyping(user) {
  const template = `<li class="typing-placeholder">${user} is typing...</li>`;
  if (!document.querySelector('.typing-placeholder')) {
    messagesBox.insertAdjacentHTML('beforeend', template);
    scrollToBottom('.typing-placeholder');
  }
}

function scrollToBottom(element) {
  const messagesList = document.querySelectorAll(element);
  messagesList[messagesList.length - 1].scrollIntoView();
}
