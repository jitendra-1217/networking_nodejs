
var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var fileFullPath = process.argv[2] || __dirname + '/sample.txt';    //  Expects first param to be file full path
var passwordText = process.argv[3] || 'samplepass';                 //  Expects second param to be password for encryption

var password = new Buffer(passwordText);
var encryptStream = crypto.createCipher('aes-256-cbc', password);
var gzip = zlib.createGzip();
var readStream = fs.createReadStream(fileFullPath);
var writeStream = fs.createWriteStream(fileFullPath + '.gz');

readStream                          //  Reads file
    .pipe(encryptStream)            //  Encrypts file contents
    .pipe(gzip)                     //  Compress file contents
    .pipe(writeStream)              //  Writes to new .gz file
    .on('finish', function() {
        console.log('[Done]');
    });
