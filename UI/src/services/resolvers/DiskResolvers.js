import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'ADD_DISK_RECORD',
        dependencies: [],
        resolver: function (action, dispatch){
            const record = Object.assign({id: action.context._id}, action.context);
            dispatch(new ReducedAction(
                'ADD_DISK_RECORD',
                `monitoring_data.server_disk_data`,
                records => [...records, record]
            ));
        }
    },
    {
        name: 'UPDATE_DISK_RECORD',
        dependencies: [],
        resolver: function (action, dispatch){
            const record = Object.assign({id: action.context._id}, action.context);
            dispatch(new ReducedAction(
                'UPDATE_DISK_RECORD',
                `monitoring_data.server_disk_data[${record.id}]`,
                record
            ));
        }
    },
    {
        name: 'REMOVE_DISK_RECORD',
        dependencies: [],
        resolver: function (action, dispatch){
            const record = action.context;
            dispatch(new ReducedAction(
                'REMOVE_DISK_RECORD',
                `monitoring_data.server_disk_data`,
                logs => logs.filter(l => l.id != record.id)
            ));
        }
    },
];
