const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000, () => console.log('listening to 3000'));
const io = socket(server, {
  cors: {
    origin: 'http://192.168.1.57:3000',
    methods: ['GET', 'POST'],
  },
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
