import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'ADD_COMPUTING_RECORD',
        dependencies: [],
        resolver: function (action, dispatch){
            const record = action.context;
            dispatch(new ReducedAction(
                'ADD_COMPUTING_RECORD',
                `monitoring_data.server_computing_data`,
                records => [...records, record]
            ));
        }
    },
    {
        name: 'UPDATE_COMPUTING_RECORD',
        dependencies: [],
        resolver: function (action, dispatch){
            const record = action.context;
            dispatch(new ReducedAction(
                'UPDATE_COMPUTING_RECORD',
                `monitoring_data.server_computing_data[${record.id}]`,
                record
            ));
        }
    },
    {
        name: 'REMOVE_COMPUTING_RECORD',
        dependencies: [],
        resolver: function (action, dispatch){
            const record = action.context;
            dispatch(new ReducedAction(
                'REMOVE_COMPUTING_RECORD',
                `monitoring_data.server_computing_data`,
                logs => logs.filter(l => l.id != record.id)
            ));
        }
    },
];
