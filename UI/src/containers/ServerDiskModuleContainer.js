import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerDiskModule from '../domainComponents/modules/ServerDiskModule.jsx'
import datefilter from '../services/lib/datefilter';

function toISODate(str){
    let date = str.split('-');
    date[1] = date[1] > 9 ? date[1] : '0' + date[1];
    date[2] = date[2] > 9 ? date[2] : '0' + date[2];
    return date.join('-');
}

const mapStateToProps = (state, props) => {
    let storage_data = state.monitoring_data.server_disk_data.filter(l => l.server == props.serverId);
    let storage_data_history = state.monitoring_data.server_disk_history_data
        .filter(l => l.server == props.serverId)
        .map(s => Object.assign({}, s, {createdAt: toISODate(s.createdAt)}));
    return {
        disk_data: state.monitoring_data.server_disk_space_time == 0 ? storage_data : datefilter(state.monitoring_data.server_disk_space_time, storage_data_history, d => d.createdAt),
        inode_data: state.monitoring_data.server_disk_inode_time == 0 ? storage_data : datefilter(state.monitoring_data.server_disk_inode_time, storage_data_history, d => d.createdAt),
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
