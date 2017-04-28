import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerStatModule from '../domainComponents/modules/ServerStatModule.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state, props) => {
    return {
        disk: state.monitoring_data.server_disk_data.filter(l => l.server == props.server.id).reduce((a, b) => {
            return Date.parse(a.createdAt) > Date.parse(b.createdAt) ? a : b;
        }),
        computing: state.monitoring_data.server_computing_data.filter(l => l.server == props.server.id).reduce((a, b) => {
            return Date.parse(a.createdAt) > Date.parse(b.createdAt) ? a : b;
        }),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onServerSelect: (server) => {
            dispatch(UA('SERVER_MONITORING_SELECT', server.id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerStatModule);
