import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerMonitoringContent from '../domainComponents/mainContent/ServerMonitoringContent.jsx';

const mapStateToProps = (state, props) => {
    let selected = props.serverId;
    let server = extractValue(state, `servers.all_servers[${selected}]`);
    return {
        server: server,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMonitoringContent);
