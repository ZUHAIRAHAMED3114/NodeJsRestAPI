var fs = require('fs');
var path = require('path');
var lib = {};
lib.baseAddress = path.join(__dirname, '/../.data/');
//Writing Data To a File...
lib.create = (dir, file, data, callback) => {
    var path = lib.baseAddress + '/' + file + '.json';
    fs.open(path, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function(error) {
                if (!error) {
                    fs.close(fileDescriptor, function(err) {
                        if (!err) {
                            callback(false)
                        } else {
                            callback('Error Closing New File....');
                        }
                    })
                } else {
                    callback('Error During Writing a New File');
                }

            });
        } else {
            callback('Could Not Create a New FIle it is Already Exist')

        }
    });

}

module.exports = lib;