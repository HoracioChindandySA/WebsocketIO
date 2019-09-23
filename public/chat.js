const socket = io ();
let message = document.getElementById('message');
let username = document.getElementById('username');
let output = document.getElementById('output');
let action = document.getElementById('action');
let btn = document.getElementById('send');
 btn.addEventListener('click', function(){
     //emitindo os eventos
     socket.emit('chat:message',{
         message: message.value,
         username: username.value
     });
 });
 message.addEventListener('keypress', function(){
     socket.emit('chat:typing', username.value);
 });
 socket.on('chat:message', function(data){
     action.innerHTML ='';
     output.innerHTML += `<p>
            <strong> ${data.username}</strong>:${data.message}
     </p>`
 });
 socket.on('chat:typing', function(data){
     action.innerHTML = `<p> <em>${data} esta escrevendo...</em></p>`
 })
