const path = require('path');
const express = require("express");
const app = express();
// seting the port 
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'),() => {
console.log('servidor esta rodando', app.get('port'));
});
const SocketIO = require('socket.io');
const io = SocketIO(server);
// websoket 
io.on('connection', (socket)  => {
    console.log('nova conecao', socket.id)
    // Ouvindo os eventos
    socket.on('chat:message', (data)=>{
        //console.log(data)
        io.sockets.emit('chat:message', data);

    });
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    })
});

// arquivos estaticos
console.log();
app.use(express.static(path.join(__dirname, 'public')));
// sarting the server
