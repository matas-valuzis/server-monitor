'use strict';
let hooks = require('./hooks');
let ServerConnector = require('../../lib/ServerConnector');

class Service {
    constructor(container) {
        this.container = container;
    }
    get(s) {

        let sc = new ServerConnector(s.private_key, s.address, s.user);
        return sc.canConnect()
            .then((e) => {
                return { connected: true, error: ''};
            })
            .catch((err) => {
                return { connected: false, error: err.message };
            });

    }
}

module.exports = function(){
    const app = this;

    // Initialize our service with any options it requires
    app.use('/connected', new Service(app));

    // Get our initialize service to that we can bind hooks
    const conService = app.service('/connected');

    // Set up our before hooks
    conService.before(hooks.before);


};

module.exports.Service = Service;