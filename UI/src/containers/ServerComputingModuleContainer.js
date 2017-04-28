import React from 'react';
import { connect } from 'react-redux';
import ReducedAction, { extractValue } from 'reduced-actions-redux';
import ServerComputingModule from '../domainComponents/modules/ServerComputingModule.jsx'


const mapStateToProps = (state, props) => {
    return {
        computing: state.monitoring_data.server_computing_data.filter(l => l.server == props.serverId),
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
