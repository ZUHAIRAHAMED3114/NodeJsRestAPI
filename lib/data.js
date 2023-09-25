var fs = require('fs');
var path = require('path');
var lib = {};
lib.baseAddress = path.join(__dirname, '/../.data/');
//Writing Data To a File...
lib.create = (dir, file, data, callback) => {
    var path = lib.baseAddress + dir + '/' + file + '.json';
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
lib.read = (dir, file, callback) => {
    var path = lib.baseAddress + dir + '/' + file + '.json';
    fs.readFile(path, 'utf8', (err, data) => {
        callback(data);
    });
}
lib.update = (dir, file, data, callback) => {
    var path = lib.baseAddress + dir + '/' + file + '.json';
    fs.open(path, 'r+', (err, fileDescriptor) => {
        if (err) {
            callback('Could Not Open the File For Updating, It may be Doesnt exists....');
            return;
        }
        var stringData = JSON.stringify(data);

        //Truncate The Existing Code....

        fs.ftruncate(fileDescriptor, (err) => {
            if (err) {
                console.log(`Error in Truncating the File....`);
                return;
            }
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (err) {
                    console.log('Error During Writing to the File After Truncate....');
                    return;
                }
                fs.close(fileDescriptor, (err) => {
                    if (err) {
                        console.log('Error in Closing the File....');
                        return;
                    }
                    callback(data)
                })

            });
        })

    });
}

module.exports = lib;