import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerMonitoringContent from '../domainComponents/mainContent/ServerMonitoringContent.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
  return {


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMonitoringContent);
