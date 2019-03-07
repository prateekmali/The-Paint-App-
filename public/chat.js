//make connection
var socket = io.connect('http://localhost:4000');

// defining variables
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var link = document.getElementById("download");
// var mode="pen";
var LastX;
var LastY;
var LastX1;
var LastY1;
var AddText;
// var mode = "pen";
// var curColor2 = "black";
var Font = "Arial";
// trigering events
button.addEventListener('click',function(){
socket.emit('chat', {
message : message.value ,
handle : handle.value
});
document.getElementById('message').value = '' ;
document.getElementById('handle').value = '' ;
});


link.addEventListener('click', function(ev) {
    link.href = myCanvas.toDataURL();
    link.download = "mypainting.png";
}, false);
document.body.appendChild(link);



message.addEventListener('keypress',function(){
	socket.emit('typing', handle.value);
});

// Listening for events
 socket.on('chat',function(data){
 output.innerHTML += '<p><strong>'+data.handle+':</strong>'+data.message+'</p>';
 feedback.innerHTML = "";
 });

 socket.on('typing',function(data){
 feedback.innerHTML = '<p style = "color:#585859" ><strong>'+data+'</strong> is typing.......</p>';
 });

 window.onload = function() {
                var myCanvas = document.getElementById("myCanvas");
                var curColor = $('#selectColor option:selected').val();
                var Size = $('#selectSize option:selected').val();
                if(myCanvas){
                                var isDown      = false;
                                var ctx = myCanvas.getContext("2d");
                                ctx.fillStyle = "white";
                                // ctx2.fillStyle = "white";
                                var ctx2 = myCanvas.getContext("2d");
                                var canvasX, canvasY;
                                // ctx.lineWidth = 4;
                                 
                                $(myCanvas)
                                .mousedown(function(e){
                                                isDown = true;
                                                ctx.beginPath();
                                                canvasX = e.pageX - myCanvas.offsetLeft;
                                                canvasY = e.pageY - myCanvas.offsetTop;
                                                LastX = canvasX;
                                                LastY = canvasY;
                                                ctx.moveTo(LastX,LastY);
                                                // ctx.moveTo(canvasX, canvasY);
                                                socket.emit('mousedown',{canvasX,canvasX});
                                })
                                .mousemove(function(e){
                                                if(isDown != false) {
                                                	// if(mode="pen"){
                                                        canvasX = e.pageX - myCanvas.offsetLeft;
                                                        canvasY = e.pageY - myCanvas.offsetTop;
                                                        ctx.lineTo(canvasX, canvasY);
                                                        ctx.strokeStyle = curColor;
                                                        // linewidth=ctx.lineWidth;
                                                        ctx.lineWidth = Size;
                                                        ctx.stroke();
                                                        socket.emit('mousemove', {canvasX,canvasY,curColor,Size});
                                                    // }
                                                    // else{
                                                    // 	ctx.globalCompositeOperation="destination-out";
                                                    //     ctx.arc(lastX,lastY,8,0,Math.PI*2,false);
                                                    //     ctx.fill();
                                                    // }
                                                }
                                })
                                .mouseup(function(e){
                                                isDown = false;
                                                ctx.closePath();
                                                socket.emit('mouseup',isDown);
                                });

                         socket.on('mousedown',function(data){
                         ctx2.beginPath();
                         // ctx2.moveTo(data.canvasX, data.canvasY);
                         LastX1 = data.canvasX;
                         LastY1 = data.canvasY;
                         ctx2.moveTo(LastX1,LastY1);
                         });

                         socket.on('mousemove',function(data){
                         // if(mode="pen"){ 
                         ctx2.lineTo(data.canvasX, data.canvasY);
                         ctx2.lineWidth = data.Size;
                         ctx2.strokeStyle = data.curColor;
                         ctx2.stroke();
                     // }
                     // else {
                     //      ctx2.globalCompositeOperation="destination-out";
                     //      ctx2.arc(lastX,lastY,8,0,Math.PI*2,false);
                     //      ctx2.fill();

                     // }
                         });

                         socket.on('mouseup',function(data){
                         ctx2.closePath();
                         });

                         socket.on('clear',function(data){
                         ctx2.clearRect(0, 0, myCanvas.width, myCanvas.height);
                         });



                }
                 
                $('#selectColor').click(function () {
                    curColor = $('#selectColor option:selected').val();
                    // curColor2 = curColor ;
                    // mode="pen";
                });

                $('#selectSize').change(function () {
                    Size = $('#selectSize option:selected').val();
                });

                // $("selectColor").click(function() {
                //          curColor = curColor2;
                //                });

                 $('#selectFont').change(function () {
                    Font = $('#selectFont option:selected').val();
                });

                $('#eraser').click(function(){
                	curColor = 'white';
                });


                $('#clear').click(function(){
                   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
                   socket.emit('clear',1);
                });

                $('#go').click(function(){

                  if(Font=="Arial"){
                   ctx.font = "100px Arial";
                }
                  if(Font=="Georgia"){
                   ctx.font = "100px Georgia";
                }
                  if(Font=="Verdana"){
                   ctx.font = "100px Verdana";
                }
                  if(Font=="Courier"){
                   ctx.font = "100px Courier";
                }
                  if(Font=="Times"){
                   ctx.font = "100px Times";
                }
                  if(Font=="Helvetica"){
                   ctx.font = "100px Helvetica";
                }
                   AddText = $('#addtext').val();
                   ctx.fillText(AddText, 10, 100);
                });
                // $("#eraser").click(function(){ mode="eraser"; });

                 
        };

 