var express = require('express');
var app = express();
var socket = require('socket.io');
var server = app.listen(4000,function(){
  console.log('listening to request on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);
io.on('connection',function(socket){
 console.log('made socket connection', socket.id);

 socket.on('chat',function(data){
  io.sockets.emit('chat', data);
 });

 socket.on('typing',function(data){
   socket.broadcast.emit('typing', data);
 });

 socket.on('mousedown',function(data){
  socket.broadcast.emit('mousedown', data);
 });

 socket.on('mousemove',function(data){
  socket.broadcast.emit('mousemove', data);
 });

 socket.on('mouseup',function(data){
  socket.broadcast.emit('mouseup', data);
 });

  socket.on('clear',function(data){
  socket.broadcast.emit('clear', data);
 });

});