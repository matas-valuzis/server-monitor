import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'FETCH_INITIAL_DATA',
        dependencies: ['keys', 'servers', 'changePathAction', 'logs'],
        resolver: function (action, dispatch){

            dispatch(new ReducedAction(
                'LOADING_KEYS_MESSAGE',
                'loader.message',
                'Loading keys...'
            ));

            this.keys.find()
                .then(keys => {
                    console.log('aaa');
                    dispatch(new ReducedAction(
                        'FETCHING_KEYS',
                        'servers.key_files',
                        keys
                    ));
                })
                .then(() => {
                    dispatch(new ReducedAction(
                        'KEYS_LOADED',
                        'loader.loaded_keys',
                        true
                    ));
                    dispatch(new ReducedAction(
                        'LOADING_SERVERS_MESSAGE',
                        'loader.message',
                        'Loading servers...'
                    ))
                })
                .then(() => this.servers.find())
                .then(d => {
                    let all_server = d.data.map(s => Object.assign({id: s._id}, s));
                    dispatch(new ReducedAction(
                        action.type,
                        'servers.all_servers',
                        all_server
                    ));
                    dispatch(new ReducedAction(
                        'KEYS_LOADED',
                        'loader.loaded_servers',
                        true
                    ));
                    dispatch(new ReducedAction(
                        'LOADING_SERVERS_MESSAGE',
                        'loader.message',
                        'Loading server logs...'
                    ))
                })
                .then(() => this.logs.find())
                .then(logs => {
                    dispatch(new ReducedAction(
                        'LOADING_SERVERS_LOGS',
                        'monitoring_data.server_logs',
                        logs.data
                    ));

                })
                .then(() => dispatch(UA('REGISTER_EVENTS')))
                .then(() => dispatch(this.changePathAction('/dashboard')))
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },
    {
        name: 'REGISTER_EVENTS',
        dependencies: ['servers', 'logs'],
        resolver: function (action, dispatch){
            this.logs.on('created', l => {
                dispatch(UA('ADD_MONITORING_LOG', l));
            });
            this.logs.on('removed', l => {
                dispatch(UA('REMOVE_MONITORING_LOG', l));
            });
            this.logs.on('updated', l => {
                dispatch(UA('UPDATE_MONITORING_LOG', l));
            });
            this.logs.on('patched', l => {
                dispatch(UA('UPDATE_MONITORING_LOG', l));
            });

        }
    },

];
