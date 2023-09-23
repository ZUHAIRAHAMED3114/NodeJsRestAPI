var http = require('http');
var url = require('url');

var server = http.createServer((req, res) => {

    var reqPath = getPath(req);
    if (!reqPath) {
        console.log('then it is Hitting Without Route');
    } else {
        console.log(`host address ${reqPath}`);
    }
    // Generating Respsne...
    SendResponse(res);
});

function getPath(req) {
    var parsed = url.parse(req.url)
    var trimmedPath = parsed.pathname.replace(/^\/+|\/+$/g, '')
    return trimmedPath;
}

function SendResponse(res) {
    // Set response headers (e.g., content type)
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Write the response content
    res.write('Hello, World!\n');

    // End the response (send it to the client)
    res.end();
}
server.listen(3000, () => {
    console.log('This Server is Listnening in the Port 3000');
});