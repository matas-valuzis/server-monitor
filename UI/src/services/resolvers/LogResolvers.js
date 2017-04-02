import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'ADD_MONITORING_LOG',
        dependencies: [],
        resolver: function (action, dispatch){
            const log = action.context;
            dispatch(new ReducedAction(
                'ADD_MONITORING_LOG',
                `monitoring_data.server_logs`,
                logs => [...logs, log]
            ));
        }
    },
    {
        name: 'UPDATE_MONITORING_LOG',
        dependencies: [],
        resolver: function (action, dispatch){
            const log = action.context;
            dispatch(new ReducedAction(
                'UPDATE_MONITORING_LOG',
                `monitoring_data.server_logs[${log.id}]`,
                log
            ));
        }
    },
    {
        name: 'REMOVE_MONITORING_LOG',
        dependencies: [],
        resolver: function (action, dispatch){
            const log = action.context;
            dispatch(new ReducedAction(
                'REMOVE_MONITORING_LOG',
                `monitoring_data.server_logs`,
                logs => logs.filter(l => l.id != log.id)
            ));
        }
    },
];
