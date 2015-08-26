
var net = require('net');
var fs = require('fs');

var server = net.createServer();

var handleConnection = function(conn) {
    var remoteAddress = conn.remoteAddress + ' : ' + conn.remotePort;

    console.log('[Client] %s', remoteAddress);

    conn.setEncoding('utf8');

    /* This happens asyn but puts data read from file in buffer until completion. Not optimal in cases. */
    fs.readFile(__dirname + '/sample.txt', function(err, data) {
        if (err) {
            console.log('[Server Error] Error in reading file.');
            return;
        }
        conn.write('[Server] ' + data);
    });

    /*
        Pipe data to client - A different approach for optimizing large file serve.
     */
    var readStream = fs.createReadStream(__dirname + '/sample.txt');
    readStream.pipe(conn);  // This closes the tcp connection once data sending is done.

    var onConnData = function(data) {

        console.log('[Client] %s, [Data] %j', remoteAddress, data);
        conn.write('[Server] Recieved your data\n');
    };

    var onConnClose = function() {

        console.log('[Client] %s Closed', remoteAddress);
    };

    var onConnError = function(err) {

        console.log('[Client] %s, [Error] %s', remoteAddress, err.message);
    };


    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);

};

server.on('connection', handleConnection);
server.listen(4005, function() {

    console.log('[Server] %j', server.address());
});
