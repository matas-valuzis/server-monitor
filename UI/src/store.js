import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { reducedActionMiddleware, createReducedActionReducer } from 'reduced-actions-redux';
import ResolverManager, { createUnresolvedActionMiddleware } from './services/UnresolvedAction';
import FeathersBackend from './services/FeathersBackend';
import reducer from './reducer.js';
import resolvers from './services/resolvers';

const fb = new FeathersBackend();
fb.connect();
let rm = new ResolverManager();
rm.registerDependcies({
    servers: fb.get('servers'),
    login: fb.login,
    keys: fb.get('keys'),
});
rm.registerResolvers(resolvers);

const resolverMiddleware = createUnresolvedActionMiddleware(rm);

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
});


let defaultStore = {
    authentication: {
      email: '',
      password: '',
      authenticated: false,
      error: ''
    },
    page: "servers",
    servers: {
      key_files: [],
      all_servers:[],
      current_server: null,
      new_server: {
        server_name: '',
        address: '',
        user: '',
        sudo: false,
        private_key: null,
      }
    },
};

module.exports = createStore(
  createReducedActionReducer(reducer(defaultStore)),
  applyMiddleware(reducedActionMiddleware, resolverMiddleware, loggerMiddleware)
);
