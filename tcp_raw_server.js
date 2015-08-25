
var net = require('net');
var server = net.createServer();

var handleConnection = function(conn) {
    var remoteAddress = conn.remoteAddress + ' : ' + conn.remotePort;

    console.log('[Client] %s', remoteAddress);

    conn.setEncoding('utf8');

    var onConnData = function(data) {

        console.log('[Client] %s, [Data] %j', remoteAddress, data);
        conn.write('[Server] Recieved your data\n');
    };

    var onConnClose = function() {

        console.log('[Client] %s', remoteAddress);
    };

    var onConnError = function(err) {

        console.log('[Client] %s, [Error] %s', remoteAddress, err.message);
    };


    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);

};

server.on('connection', handleConnection);
server.listen(4001, function() {

    console.log('[Server] %j', server.address());
});
