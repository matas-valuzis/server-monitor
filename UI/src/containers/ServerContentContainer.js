import React from 'react';
import { connect } from 'react-redux';
import { extractValue } from 'reduced-actions-redux'
import ServersContent from '../domainComponents/mainContent/ServersContent.jsx'
const mapStateToProps = (state) => {
    let selected = state.servers.current_server;
    let server = extractValue(state, `servers.all_servers[${selected}]`);
    return {
        name: server.server_name,
        address: server.address
    };
};

export default connect(mapStateToProps)(ServersContent);
