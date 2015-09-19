var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', './views');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home', {
	title: 'Welcome'
	});
});

var server = app.listen(app.get('port'), function () {
	console.log('Node app is running on port: ' + app.get('port'));
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('connected!');
    socket.on('chat message', function(msg) {
        console.log('message' + msg);
        io.emit('chat message', msg);
    });
});
