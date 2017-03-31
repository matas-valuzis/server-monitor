import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerLogModule from '../domainComponents/modules/ServerLogModule.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
  return {


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerLogModule);
