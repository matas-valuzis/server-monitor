import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerDiskModule from '../domainComponents/modules/ServerDiskModule.jsx'


const mapStateToProps = (state, props) => {
    return {
        disk: state.monitoring_data.server_disk_data.filter(l => l.server == props.serverId),
        diskTime: state.monitoring_data.server_disk_space_time,
        inodeTime: state.monitoring_data.server_disk_inode_time
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onDiskTabSelect: t => {
          dispatch(new ReducedAction('RAM_TAB_SELECT','monitoring_data.server_disk_space_time', t.id));
      },
      onInodeTabSelect: t => {
          dispatch(new ReducedAction('RAM_TAB_SELECT','monitoring_data.server_disk_inode_time', t.id));
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerDiskModule);
