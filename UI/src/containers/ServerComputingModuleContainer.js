import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerComputingModule from '../domainComponents/modules/ServerComputingModule.jsx'
import datefilter from '../services/lib/datefilter';

const mapStateToProps = (state, props) => {
    const server_computing = state.monitoring_data.server_computing_data.filter(l => l.server == props.serverId);
    return {
        ram_data: datefilter(state.monitoring_data.server_computing_ram_time, server_computing, d => d.createdAt),
        task_data: datefilter(state.monitoring_data.server_computing_task_time, server_computing, d => d.createdAt),
        cpu_data: datefilter(state.monitoring_data.server_computing_cpu_time, server_computing, d => d.createdAt),
        ramTime: state.monitoring_data.server_computing_ram_time,
        taskTime: state.monitoring_data.server_computing_task_time,
        cpuTime: state.monitoring_data.server_computing_cpu_time,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onRamTabSelect: t => {
          dispatch(new ReducedAction('RAM_TAB_SELECT','monitoring_data.server_computing_ram_time', t.id));
      },
      onTaskTabSelect: t => {
          dispatch(new ReducedAction('TASK_TAB_SELECT','monitoring_data.server_computing_task_time', t.id));
      },
      onCpuTabSelect: t => {
          dispatch(new ReducedAction('CPU_TAB_SELECT','monitoring_data.server_computing_cpu_time', t.id));
      }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerComputingModule);
