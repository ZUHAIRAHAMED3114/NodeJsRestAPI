//Create and Export Configuration Varialbes...

//General Container FOr all The Envirionment
var enviroment = {
    staging: {
        port: 3000,
        envName: 'staging'
    },
    production: {
        port: 5000,
        envName: 'production'
    }
};

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ?
    process.env.NODE_ENV.toLowerCase() : '';

var exportingEnviroment = typeof(enviroment[currentEnvironment]) == 'object' ?
    enviroment[currentEnvironment] :
    enviroment['staging'];

module.exports = exportingEnviroment;