import React from 'react';
import { connect } from 'react-redux';
import MainMonitoringContent from '../domainComponents/mainContent/MainMonitoringContent.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state) => {

    return {
        servers: state.servers.all_servers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onServerSelect: (server) => {
            dispatch(UA('SERVER_MONITORING_SELECT', server.id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMonitoringContent);
