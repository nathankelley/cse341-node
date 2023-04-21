#!javascript

/*var express = require('express'),
    app = express();
app.use(express.static(__dirname + '/public'));
app.listen(8080);*/

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Suhnya Kelley\n');
}).listen(8080);
console.log('Server running on port 8080.');