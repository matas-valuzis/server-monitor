import { createStore, applyMiddleware, combineReducers} from 'redux';
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware, push, goBack} from 'react-router-redux'
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
    changePathAction: push,
    goBackAction: goBack
});
rm.registerResolvers(resolvers);

const resolverMiddleware = createUnresolvedActionMiddleware(rm);
let history = createHistory();

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
});

const reactRouterMiddleware = routerMiddleware(history);


let defaultStore = {
    loader: {
        message: '',
        loaded_keys: false,
        loaded_servers: false,
    },
    authentication: {
      email: '',
      password: '',
      authenticated: false,
      error: ''
    },
    servers: {
      key_files: [],
      all_servers:[],
      new_server: {
        server_name: '',
        address: '',
        user: '',
        sudo: false,
        private_key: null,
      }
    },
};

const rootReducer = combineReducers({
    authentication: reducer(defaultStore.authentication),
    routing: routerReducer,
    servers: reducer(defaultStore.servers),
    loader: reducer(defaultStore.loader)
});


let store = createStore(
  createReducedActionReducer(rootReducer),
  applyMiddleware(reducedActionMiddleware, resolverMiddleware, loggerMiddleware, reactRouterMiddleware)
);

module.exports.store = store;
module.exports.history = history;