import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerMenu from '../domainComponents/menus/ServerMenu.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state) => {
    return {
        servers: state.servers.all_servers,
        current_server: state.servers.current_server + '',
        new: state.page == 'new' || state.servers.current_server == null
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onServerSelect: server => {
        dispatch(new ReducedAction('SELECT_SERVER', 'servers.current_server', server.id));
        dispatch(new ReducedAction('SELECT_SERVER', 'page', 'servers'));
    },
    onMenuLoad: () => {
       dispatch(UA('FETCH_SERVERS'));
    },
    onNewSelect: () => {
        dispatch( new ReducedAction('SELECT_NEW', 'page', 'new'));
        dispatch(new ReducedAction('SELECT_SERVER', 'servers.current_server', null));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMenu);
