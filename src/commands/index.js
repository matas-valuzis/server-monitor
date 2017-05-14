'use strict';
const ServerMonitoringManager = require('../lib/ServerMonitoringManager');
module.exports = function execute(args) {
  if (!args._ || args._[0] == 'start'){
      const app = require('../app').app;
      const daemon = new ServerMonitoringManager(require('../app').services);
      const port = app.get('port');
      const server = app.listen(port);
      server.on('listening', () =>
        console.log(`Feathers application started on ${app.get('host')}:${port}`)
      );
      daemon.start();
  }
  if(args._[0] == 'create:user'){
      const app = require('../app-cli');
      app.service('users').create({
        email: args._[1],
        password: args._[2]
      })
      .then(
          d => {
              console.log('User created!');
              process.exit(0);
          })
      .catch(e => {
          console.error(e);
          process.exit(0);
      });
  }

};
