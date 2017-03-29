import React from 'react';
import { connect } from 'react-redux';
import { extractValue } from 'reduced-actions-redux'
import ServersContent from '../domainComponents/mainContent/ServersContent.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';

const mapStateToProps = (state) => {
    let selected = state.servers.current_server;
    let server = extractValue(state, `servers.all_servers[${selected}]`);
    return {
        server: server,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => {
            dispatch(UA('DELETE_SERVER', id));
        },
        onCheck: (id) => {
            dispatch(UA('CHECK_SERVER_CONNECTION', id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServersContent);
