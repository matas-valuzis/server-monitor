'use strict';
const NodeSSH = require('node-ssh');
const Client = require('ssh2').Client;
const path = require('path');

 class ServerConnector{
    constructor(key, ip, user){
        this.key = path.resolve('keys/', key);
        this.ip = ip;
        this.user = user;
        this.ssh = new NodeSSH();

    }

    __connect(){
        return this.ssh.connect({host: this.ip, username: this.user, privateKey: this.key});
    }

    canConnect(){
        return this.__connect();
    }

    execute(command, dir){
        return this.__connect().then(() =>
            this.ssh.execCommand(command, {cwd: dir})
        );
    }

    executeWithStream(command, cb, error, close){
        let conn = new Client();
        return conn.on('ready', function() {
            conn.exec(command,  function(err, stream) {
                if (err) throw err;
                stream.setEncoding('utf8');
                stream.stderr.setEncoding('utf8');
                stream.on('close', function(code, signal) {
                    console.log(`Stream closed code: ${code} signal: ${signal} command: ${command}`);
                    if (close) close(code);
                    conn.end();
                }).on('data', function(data) {
                    cb(data.replace('\r', ''));
                }).stderr.on('data', function(data) {
                    error(data);
                });
            });
        }).connect({
            host: this.ip,
            port: 22,
            username: this.user,
            privateKey: require('fs').readFileSync(this.key)
        });
    }



}
module.exports = ServerConnector;