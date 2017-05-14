'use strict';
let fs = require('fs');

const hooks = require('./hooks');

class Service {
    constructor(options) {
        this.options = options || {};
    }

    find(params) {
    return new Promise(function(resolve, revoke){
        fs.readdir('keys', (err, keys) => {
          if(err){
            revoke(err);
          }
          resolve(keys.filter(k => k != '.gitkeep'));
        });
    });
    }

    create(data, params) {
        return new Promise(function(resolve, reject){
            const newFilePath = 'keys/' + data.file_name;
            if (fs.existsSync(newFilePath)) {
                throw new Error('Key file already exists!');
            }
            let content = new Buffer(data.data, 'base64').toString();
            fs.writeFile(newFilePath, content, err => {
                if (err){
                    reject(err);
                }
                else{
                    resolve(data.file_name);
                }
            })
        });
    }

    remove(id, params) {
        return new Promise(function(resolve, revoke){
            const path = 'keys/'+id;
            fs.unlink(path,  e => {
                if (e){
                    revoke(e);
                }
                else{
                    resolve(id);
                }
            });
        });
    }

}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/keys', new Service());

  // Get our initialize service to that we can bind hooks
  const keysService = app.service('/keys');

  // Set up our before hooks
  keysService.before(hooks.before);

  // Set up our after hooks
  keysService.after(hooks.after);
};

module.exports.Service = Service;
