const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'https://www.google.br', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }});

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  socket.on('postComment', (comment) => {
    io.emit('broadcastComment', comment)
  })
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});