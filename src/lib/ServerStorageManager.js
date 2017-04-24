'use strict';
const ServerConnector = require('./ServerConnector');

class ServerStorageManager{
    constructor(storage){
        this.storage = storage;
    }
    doMeasurement(server){
        const con = new ServerConnector(server.private_key, server.address, server.user);
        const sudo = server.sudo ? 'sudo ': '';
        const command = `{ df / | tail -1 | awk '{print $3}'; df -i / | tail -1 | awk '{print $3}'; } | cat`;
        return new Promise((resove, reject) => {
            let data = "";
            con.executeWithStream(command, output => {
                data += output;
            }, reject, () =>{
                resove(data.split('\n').filter(s => s != ''));
            });
        });
    }

    createRecord(server){
        return this.doMeasurement(server.toObject())
            .then((data) => {
                let newRecord = {
                    server: server.toObject()._id.toString(),
                    used_space: data[0],
                    used_inodes: data[1]
                };
                return this.storage.create(newRecord);
            })
    }

    deleteStorageData(server_id){
        return this.storage.remove(null, {query:{server: server_id}});
    }

    bindSeverEvents(servers){
        servers.on('removed', s => {
            const server = s.toObject();
            this.deleteStorageData(server._id.toString());
        });
    }
}
module.exports = ServerStorageManager;