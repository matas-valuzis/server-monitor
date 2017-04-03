'use strict';
const ServerLogManager = require('./ServerLogManager');
const ServerConnector = require('./ServerConnector');
class ServerMonitoringManager{
    constructor(app){
        this.app = app;
        this.logManager = new ServerLogManager(app.service('/logs'));

    }

    start(){
        this.createLogs();
    };

    createLogs(){
        const servers = this.app.service('/servers');
        this.logManager.bindSeverEvents(servers);
        servers.find({}).then(servers => servers.data.map(s => {
            this.logManager.createLogs(s);
        }));

    };
}
module.exports = ServerMonitoringManager;