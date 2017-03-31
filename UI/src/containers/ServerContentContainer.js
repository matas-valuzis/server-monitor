import React from 'react';
import { connect } from 'react-redux';
import { extractValue } from 'reduced-actions-redux'
import ServersContent from '../domainComponents/mainContent/ServersContent.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';

const mapStateToProps = (state, ownProps) => {
    let selected = ownProps.serverId;
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
        onLogDelete: (server, id) => {
            dispatch(UA('REMOVE_SERVER_LOG', {log_id: id, server: server}));
        },
        onCheck: (id) => {
            dispatch(UA('CHECK_SERVER_CONNECTION', id));
        },
        onNewLogAdd: (server, log) => {
            dispatch(UA('ADD_SERVER_LOG', {
                server: server,
                name: log.name,
                path: log.path
            }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServersContent);
