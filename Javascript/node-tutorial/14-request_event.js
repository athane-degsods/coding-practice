const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.end('Welcome to our home page');
});

server.listen(5000);