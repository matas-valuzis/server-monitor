'use strict';
const ServerLogManager = require('./ServerLogManager');
const ServerStorageManager = require('./ServerStorageManager');
const ServerComputingManager = require('./ServerComputingManager');
const ServerConnector = require('./ServerConnector');
class ServerMonitoringManager{
    constructor(app){
        this.interval = 60*1000;
        this._servers = app.service('/servers');
        this._logManager = new ServerLogManager(app.service('/logs'));
        this._storageManager = new ServerStorageManager(app.service('/storage'));
        this._computingManager = new ServerComputingManager(app.service('/computing'));
        this.continueMonitoring = true;
    }

    start(){
        this.initServers();
        this._collectData();
    };

    initServers(){
        this._storageManager.bindSeverEvents(this._servers);
        this._logManager.bindSeverEvents(this._servers);
        this._computingManager.bindSeverEvents(this._servers);
        this._servers.find({}).then(servers => servers.data.map(s => {
            this._logManager.createLogs(s);
        }));
    };

    _collectData(){
        if (!this.continueMonitoring){
            return;
        }
        this._servers.find({}).then(servers => servers.data.map(s => {
            this._storageManager.createRecord(s);
            this._computingManager.createRecord(s);
        }));
        setTimeout(() => {
            this._collectData();
        }, this.interval)
    }
}

module.exports = ServerMonitoringManager;