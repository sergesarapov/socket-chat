const express = require('express');
const socket = require('socket.io');
const app = express();
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => console.log('listening to PORT'));
const io = socket(server, {
  cors: {
    origin: 'https://socket-io-experimental-chat.herokuapp.com/',
    methods: ['GET', 'POST'],
  },
});

app.get('/', function (req, res) {
  res.send('hello world');
});
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Opened Socket Connection', socket.id);
  socket.on('message', (data) => {
    io.sockets.emit('message', data);
  });
  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  });
});
