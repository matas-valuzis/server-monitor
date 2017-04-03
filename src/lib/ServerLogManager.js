'use strict';
const ServerConnector = require('./ServerConnector');

class ServerLogManager{
    constructor(logs){
        this.logs = logs;
        this.connections = {};
    }
    updateLog(logModel, server){
        const log = logModel;
        const path = log.log_path;
        const sudo = log.sudo ? 'sudo ': '';
        const con = new ServerConnector(server.private_key, server.address, server.user);
        let serverCon = con.executeWithStream(`${sudo}tail -f ${path}`,
            (data) => {
                this.logs.get(log.id).then((l) => {
                    let newLines = l.lines.concat(data.split('\n')).splice(-100).filter(line => line != '');
                    this.logs.patch(l.id, {lines: newLines, error: ''});
                });
            }, (err) =>{
                this.logs.patch(log.id, {error: err});
            }
        );
        if (typeof this.connections[log.log] != 'undefined'){
            this.connections[log.log].end();
        }
        this.connections[log.log] = serverCon;
        return Promise.resolve();
    }

    createLogs(server){

        return Promise.resolve()
            .then(() => {
                let promises = server.logs.map((log) => {
                    let logModel = {
                        sudo: server.sudo,
                        server: server._id.toString(),
                        log: log._id.toString(),
                        log_name: log.name,
                        log_path: log.path,
                        lines: [],
                        error: ''
                    };
                    return this.logs
                        .create(logModel)
                        .then(log => this.updateLog(log, server));
                });
                return Promise.all(promises);
            })
            .catch(err => {
                logModel.error = 'Error connecting to server';
                return logModel;
            });


    }

    onServerUpdate(server){
        return this.deleteServerLogs(server._id)
            .then(() => this.createLogs(server))
    }

    deleteServerLogs(server_id){
        return this.logs.remove(null, {query:{server: server_id}});
    }

    bindSeverEvents(servers){
        servers.on('created', s => {
            const server = s.toObject();
            this.createLogs(server);
        });
        servers.on('updated', s => {
            const server = s.toObject();
            this.deleteServerLogs(server._id.toString())
                .then((s) => {
                    return this.createLogs(server);
                });
        });
        servers.on('patched', s => {
            const server = s.toObject();
            this.deleteServerLogs(server._id.toString())
                .then((s) => {
                   return this.createLogs(server);
                });
        });
        servers.on('removed', s => {
            const server = s.toObject();
            this.deleteServerLogs(server._id.toString());
        });
        this.logs.on('removed', log => {
            if (typeof this.connections[log.log] != 'undefined'){
                this.connections[log.log].end();
                delete this.connections[log.log];
            }
        });
    }
}
module.exports = ServerLogManager;