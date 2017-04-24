'use strict';
const ServerConnector = require('./ServerConnector');

class ServerComputingManager{
    constructor(computing){
        this._computing = computing;
    }
    doMeasurement(server){
        const con = new ServerConnector(server.private_key, server.address, server.user);
        const command = `top -bn1 | head -4 | tail -3 | tr '\\n' ' ' | awk '{print $2-4"\\n"100-$19 "\\n"$33}'`;
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
                let record = {
                    server: server.toObject()._id.toString(),
                    tasks: data[0],
                    used_cpu: data[1],
                    used_ram: data[2]
                };
                return this._computing.create(record);
            })
    }

    deleteComputingData(server_id){
        return this._computing.remove(null, {query:{server: server_id}});
    }

    bindSeverEvents(servers){
        servers.on('removed', s => {
            const server = s.toObject();
            this.deleteComputingData(server._id.toString());
        });
    }
}
module.exports = ServerComputingManager;