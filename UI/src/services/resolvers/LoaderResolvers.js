import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'FETCH_INITIAL_DATA',
        dependencies: ['keys', 'servers', 'changePathAction'],
        resolver: function (action, dispatch){
            dispatch(new ReducedAction(
                'LOADING_KEYS_MESSAGE',
                'loader.message',
                'Loading keys...'
            ));
            this.keys.find()
                .then(keys => {
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
                })
                .then(() => dispatch(this.changePathAction('/dashboard')))
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },

];
