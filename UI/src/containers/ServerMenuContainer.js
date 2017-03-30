import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerMenu from '../domainComponents/menus/ServerMenu.jsx'
import {createUnresolvedAction as UA} from '../services/UnresolvedAction';


const mapStateToProps = (state, props) => {
    return {
        data_loaded: state.loader.loaded_servers,
        servers: state.servers.all_servers,
        current_server: props.params.serverId || null,
        new: props.params.action == 'new'
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onServerSelect: server => {
        dispatch(UA('SERVER_EDIT_SELECT', server.id));
    },
    onMenuLoad: (load) => {
       return load || dispatch(UA('FETCH_SERVERS'));
    },
    onNewSelect: () => {
        dispatch(UA('SERVER_NEW_SELECT'));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMenu);
