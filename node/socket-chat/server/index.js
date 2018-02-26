const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function() {
  console.log('listen in 3000')
})
