import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerMenu from '../domainComponents/menus/ServerMenu.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state) => {
    return {
      servers: state.servers.all_servers.map(s => Object.assign({}, s, {id: s._id})),
      current_server: state.servers.current_server + ''
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onServerSelect: server => dispatch(
      new ReducedAction('SELECT_SERVER', 'servers.current_server', server.id)
    ),
    onMenuLoad: () => {
       dispatch(UA('FETCH_SERVERS'));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMenu);
