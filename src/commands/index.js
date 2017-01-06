'use strict';

module.exports = function execute(args) {
  if (!args._ || args._[0] == 'start'){
      const app = require('../app');
      const port = app.get('port');
      const server = app.listen(port);

      server.on('listening', () =>
        console.log(`Feathers application started on ${app.get('host')}:${port}`)
      );
  }
  if(args._[0] == 'create:user'){
      const app = require('../app-cli');
      app.service('users').create({
        email: args._[1],
        password: args._[2]
      })
      .then(d => console.log('User created!'))
      .catch(e => console.error(e));
  }

};
