var express = require('express');
var appl = express();
var socket = require('socket.io');
var server = appl.listen(4000,function(){
  console.log('listening to request on port 4000');
});

// Static files
appl.use(express.static('public'));

// Socket setup
var io = socket(server);
io.on('connection',function(socket){
 console.log('Made Socket Connection', socket.id);

 socket.on('chat',function(data){
  io.sockets.emit('chat', data);
 });

 socket.on('typing',function(data){
   socket.broadcast.emit('Typing', data);
 });

 socket.on('mousedown',function(data){
  socket.broadcast.emit('Mousedown', data);
 });

 socket.on('mousemove',function(data){
  socket.broadcast.emit('Mousemove', data);
 });

 socket.on('mouseup',function(data){
  socket.broadcast.emit('Mouseup', data);
 });

  socket.on('clear',function(data){
  socket.broadcast.emit('Clear', data);
 });

  socket.on('text1',function(data){
  socket.broadcast.emit('Text1', data);
 });

});
