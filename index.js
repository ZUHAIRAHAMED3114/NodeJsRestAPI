var http = require('http');

var server = http.createServer((req, res) => {
    // Set response headers (e.g., content type)
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Write the response content
    res.write('Hello, World!\n');

    // End the response (send it to the client)
    res.end();
});

server.listen(3000, () => {
    console.log('This Server is Listnening in the Port 3000');
});