const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');
const authentication = require('feathers-authentication/client');

export default class FeathersBackend {
    constructor(apiUrl = ''){
        if (apiUrl == ''){
            apiUrl = window.location.host;
        }
        this.apiUrl = apiUrl;
        this.app = {};
        this.login = this.login.bind(this);
    }
    connect(){
        const socket = io(this.apiUrl);
        this.app = feathers()
            .configure(hooks())
            .configure(socketio(socket))
            .configure(authentication());
    }
    login(email, pass){
      return this.app.authenticate({
          type: 'local',
          'email': email,
          'password': pass
      })
    }
    get(serviceName){
        return this.app.service(serviceName);
    }

}
