var http = require('http');
var config = require('./config')
var Route = require('./route')

var { SendResponse, getRequestData } = require('./reqres');
var _data = require('./lib/data');
var { add, get } = Route();
var server = null;
InitialSetup();

function InitialSetup() {
    RegisterRoutes(add);
    server = http.createServer(async(req, res) => {

        let requestObject = await getRequestData(req)
        req.customReq = requestObject;
        get(requestObject.Route)(req, res);

    });
    server.listen(config.port, () => {
        console.log('This Server is Listnening in the Port ' + config.port);
    });

}

//Register The Routes....
function RegisterRoutes(routes) {

    routes('test', (req, res) => {
        console.log('In the test Mehtod')
        console.log(JSON.stringify(req.customReq));
        SendResponse(res, { message: 'In the Text Route...' }, 200, 'Application/json');
    })

    routes('ping', (req, res) => {
        SendResponse(res, { message: 'Iam Alive' }, 200, 'Application/json');
    })
}