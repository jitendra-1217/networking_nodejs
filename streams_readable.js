
/*
    __read is only called when there is a consumer.
    Run like `node streams_readable.js | head -n4`.
 */


var Readable = require('stream').Readable;

var rs = new Readable;

var limit = 10;

rs._read = function() {

    if (limit === 0) return rs.push(null);

    setTimeout(function() {
        --limit;
        rs.push('Hii! Again I am jitendra.\n');
    }, 100);
};

rs.pipe(process.stdout);

process.on('exit', function() {

    console.error('_ready called: ' + (10 - limit) + ' times.');
})

process.stdout.on('error', process.exit);
