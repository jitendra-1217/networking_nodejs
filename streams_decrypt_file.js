
var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');
var path = require('path');

var fileFullPath = process.argv[2] || __dirname + '/sample.txt.gz';    //  Expects first param to be file full path
var passwordText = process.argv[3] || 'samplepass';                 //  Expects second param to be password for encryption

var password = new Buffer(passwordText);
var decryptStream = crypto.createDecipher('aes-256-cbc', password);
var gzip = zlib.createGunzip();
var readStream = fs.createReadStream(fileFullPath);
var writeStream = fs.createWriteStream(__dirname + '/' + new Date().getTime().toString());

readStream                          //  Reads file
    .pipe(gzip)                     //  Uncompresses file
    .pipe(decryptStream)            //  Decrypts file
    // .pipe(process.stdout)           //  Outputs to terminal
    .pipe(writeStream)              //  Outputs to a file
    .on('finish', function() {
        console.log('[Done]');
    });
