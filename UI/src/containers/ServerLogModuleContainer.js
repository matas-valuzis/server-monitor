import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerLogModule from '../domainComponents/modules/ServerLogModule.jsx'


const mapStateToProps = (state, props) => {
    return {
        logs: state.monitoring_data.server_logs.filter(l => l.server == props.serverId)
    };
};

const mapDispatchToProps = (dispatch) => {
  return {


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerLogModule);
