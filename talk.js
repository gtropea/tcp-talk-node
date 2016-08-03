
var net = require('net');
var stdin = process.openStdin();

if (process.argv[2] == null) {
	var server = net.createServer(function(socket) {
		socket.write('Talk server is online\r\n');

		socket.on('data', function(data) {
			console.log('Server Received: ' + data);
		});

		stdin.on('data', function(chunk) {
			socket.write(chunk);
		});
	});

	server.listen(1337, '0.0.0.0');
}
else {
	var client = new net.Socket();
	client.connect(1337, process.argv[2], function() {
		console.log('Connected');
		client.write('Hello, server! Love, Client.');

		stdin.on('data', function(chunk) {
			client.write(chunk);
		});
	});

	client.on('data', function(data) {
		console.log('Client Received: ' + data);
	});

	client.on('close', function() {
		console.log('Connection closed');
		client.destroy();
	});
}
