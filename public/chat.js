console.log('asdfgfdf');
var socket = io.connect('http://localhost:4000');
console.log("socket==>",socket)
// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
      console.log(message.value)

        var object = {};
        // var object2= {};

function func(data){
object.message = document.getElementById('message').value;
object.handle = document.getElementById('handle').value;
object.output = document.getElementById('output').value;
console.log("object",object)
  socket.emit('message', object);
  // socket.emit('handle', object2);

}


console.log("ghjk\\\\\\\\\\");
// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';

});


socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
