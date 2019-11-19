const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.status(200).send('Hola mundo');
});

server.listen(6677, () => {
    console.log('servidor corriendo en http://localhost:6677');
});

var messages = [{
    id: 1,
    text: 'Bienvenido el chat privado de socket.io y NodeJS..',
    nickname: 'bot - pc'
}];

io.on('connection', (socket) => {
    console.log('El cliente con IP ' + socket.handshake.address + ' se ha conectado .. ');
    
    socket.emit('messages', messages);

    socket.on('add-message', (data)=>{
        messages.push(data)

        io.sockets.emit('messages', messages);
    });
});
