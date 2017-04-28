import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'FETCH_INITIAL_DATA',
        dependencies: ['keys', 'servers', 'changePathAction', 'logs', 'storage', 'computing'],
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
                .then(() => {
                    dispatch(new ReducedAction(
                        'LOADING_SERVERS_MESSAGE',
                        'loader.message',
                        'Loading storage data...'
                    ))
                })
                .then(() => this.storage.find())
                .then((s) => {
                    dispatch(new ReducedAction(
                        'LOADING_SERVERS_STORAGE_DATA',
                        'monitoring_data.server_disk_data',
                        s.data.map(d => Object.assign({id: d._id}, d))
                    ))
                })
                .then(() => {
                    dispatch(new ReducedAction(
                        'LOADING_SERVERS_MESSAGE',
                        'loader.message',
                        'Loading process data...'
                    ))
                })
                .then(() => this.computing.find())
                .then((s) => {
                    dispatch(new ReducedAction(
                        'LOADING_SERVERS_COMPUTING_DATA',
                        'monitoring_data.server_computing_data',
                        s.data.map(d => Object.assign({id: d._id}, d))
                    ))
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
        dependencies: ['servers', 'logs', 'storage', 'computing'],
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

            this.storage.on('created', l => {
                dispatch(UA('ADD_DISK_RECORD', l));
            });
            this.storage.on('removed', l => {
                dispatch(UA('REMOVE_DISK_RECORD', l));
            });
            this.storage.on('updated', l => {
                dispatch(UA('UPDATE_DISK_RECORD', l));
            });
            this.storage.on('patched', l => {
                dispatch(UA('UPDATE_DISK_RECORD', l));
            });

            this.computing.on('created', l => {
                dispatch(UA('ADD_COMPUTING_RECORD', l));
            });
            this.computing.on('removed', l => {
                dispatch(UA('REMOVE_COMPUTING_RECORD', l));
            });
            this.computing.on('updated', l => {
                dispatch(UA('UPDATE_COMPUTING_RECORD', l));
            });
            this.computing.on('patched', l => {
                dispatch(UA('UPDATE_COMPUTING_RECORD', l));
            });


        }
    },

];
