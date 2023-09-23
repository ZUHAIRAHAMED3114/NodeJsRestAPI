 function Route() {

     let routs = {
         'notfound': (req, res) => {
             console.log('Router is Not Available For Above Path...');
         }
     }
     return {
         get: function(path) {
             if (routs[path]) {
                 return routs[path];
             }
             return routs['notfound'];
         },
         add: function(path, callback) {
             routs[path] = callback;
         }
     }
 }

 module.exports = Route;