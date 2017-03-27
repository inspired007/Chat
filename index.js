/**
 * Created by inspired on 27.03.17.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});


io.on('connection', function(socket){
    socket.on('join', function(name){
        socket.nickname = name;
    });

    socket.on('chat message', function(msg){
        var nickname = socket.nickname;
        //io.broadcast.emit('chat message', nickname + ": " + msg);
        io.emit('chat message', nickname + ": " + msg);
    });
});


io.on('connection', function(socket){
    console.log('a user connected');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(8080, function(){
    console.log('listening on *:8080');
});