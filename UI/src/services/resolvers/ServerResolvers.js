import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'FETCH_SERVERS',
        dependencies: ['servers'],
        resolver: function (action, dispatch){
            this.servers.find().then(d => {
                let all_server = d.data.map(s => Object.assign({id: s._id}, s));
                dispatch(new ReducedAction(
                    action.type,
                    'servers.all_servers',
                    all_server
                ));
            }).catch(e => {
                dispatch(UA('ERROR', e));
            });
        }
    },
    {
        name: 'ADD_SERVER',
        dependencies: ['servers'],
        resolver: function (action, dispatch){
            this.servers.create(action.context)
                .then(s => {
                    dispatch(new ReducedAction(
                        action.type,
                        'servers.all_servers',
                        all => [...all, Object.assign({id: s._id}, s)]
                    ))
                })
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },
    {
        name: 'DELETE_SERVER',
        dependencies: ['servers'],
        resolver: function (action, dispatch){
            let server_id = action.context;
            this.servers.remove(server_id)
                .then(s => {
                    dispatch(new ReducedAction(
                        action.type,
                        'servers.current_server',
                        null
                    ));
                    dispatch(new ReducedAction(
                        action.type,
                        'servers.all_servers',
                        all => all.filter(s => s.id != server_id)
                    ));
                })
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },
    {
        name: 'CHECK_SERVER_CONNECTION',
        dependencies: ['servers'],
        resolver: function (action, dispatch){
            let server_id = action.context;
            this.servers.get(server_id, {query:{checkifconnected: true}})
                .then(con => {
                    dispatch(new ReducedAction(
                        'UPDATE_SERVER_CONNECTION_CHECK',
                        `servers.all_servers[${server_id}]`,
                        s => Object.assign({ }, s, {connection_check: con})
                    ));
                })
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },
    {
        name: 'FETCH_KEYS',
        dependencies: ['keys'],
        resolver: function (action, dispatch){
            this.keys.find()
                .then(d => {
                    dispatch(new ReducedAction(
                        action.type,
                        'servers.key_files',
                        d
                    ));
                })
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },
    {
        name: 'SERVER_EDIT_SELECT',
        dependencies: ['changePathAction'],
        resolver: function (action, dispatch){
            const server_id = action.context;
            dispatch(this.changePathAction('/dashboard/edit/' + server_id));
        }
    },
    {
        name: 'SERVER_NEW_SELECT',
        dependencies: ['changePathAction'],
        resolver: function (action, dispatch){
            dispatch(this.changePathAction('/dashboard/new'));
        }
    },
];
