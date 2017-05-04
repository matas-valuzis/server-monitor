import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerDiskModule from '../domainComponents/modules/ServerDiskModule.jsx'
import datefilter from '../services/lib/datefilter';

const mapStateToProps = (state, props) => {
    let storage_data = state.monitoring_data.server_disk_data.filter(l => l.server == props.serverId);
    return {
        disk_data: datefilter(state.monitoring_data.server_disk_space_time, storage_data, d => d.createdAt),
        inode_data: datefilter(state.monitoring_data.server_disk_inode_time, storage_data, d => d.createdAt),
        diskTime: state.monitoring_data.server_disk_space_time,
        inodeTime: state.monitoring_data.server_disk_inode_time
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onDiskTabSelect: t => {
          dispatch(new ReducedAction('DISK_TAB_SELECT','monitoring_data.server_disk_space_time', t.id));
      },
      onInodeTabSelect: t => {
          dispatch(new ReducedAction('INODE_TAB_SELECT','monitoring_data.server_disk_inode_time', t.id));
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerDiskModule);
