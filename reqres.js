var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;

async function getRequestData(req) {
    var Route = getPath(req);
    var HttpMethod = getHttpMehtod(req);
    var Params = getQueryString(req);
    var Headers = getHeaders(req);
    var Payload = await getPayloadPromise(req);

    function getHeaders(req) {
        return req.headers
    }

    function getHttpMehtod(req) {
        return req.method.toLowerCase();
    }

    function getQueryString(req) {
        return url.parse(req.url).query
    }

    function getPath(req) {
        var parsed = url.parse(req.url)
        var trimmedPath = parsed.pathname.replace(/^\/+|\/+$/g, '')
        return trimmedPath;
    }

    function getPayloadPromise(req) {
        return new Promise((resolve, reject) => {

            const DECODEUTF8 = new stringDecoder('utf-8');
            var buffer = '';
            var payload = null;
            req.on('data', function(data) {
                buffer += DECODEUTF8.write(data);
            });
            req.on('end', () => {
                buffer += DECODEUTF8.end();
                payload = JSON.parse(buffer);
                resolve(payload);
            })

        })
    }

    function getPayload(req) {
        const DECODEUTF8 = new stringDecoder('utf-8');
        var buffer = '';
        var payload = null;
        req.on('data', function(data) {

            buffer += DECODEUTF8.write(data);
        });
        req.on('end', () => {
            buffer += DECODEUTF8.end();
            payload = JSON.parse(buffer);
            console.log('Payload...')
            console.log(payload);
        })
        return payload;
    }


    return {
        Route,
        HttpMethod,
        Params,
        Headers,
        Payload
    }
}


function SendResponse(res, message, statusCode, ContentType) {

    var Message = message;
    if (ContentType == 'Application/json') {
        Message = JSON.stringify(message);
    }

    // Set response headers (e.g., content type)
    res.writeHead(statusCode, { 'Content-Type': ContentType });

    // Write the response content
    res.write(Message);

    // End the response (send it to the client)
    res.end();
}

module.exports = { SendResponse, getRequestData }