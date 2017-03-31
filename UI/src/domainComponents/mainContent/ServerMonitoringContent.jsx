import React, {Component} from 'react';
import ServerLogModuleContainer from '../../containers/ServerLogModuleContainer';


export default class ServerMonitoringContent extends Component {

    render() {
        return (
            <div className="server-module log-module">
              <ServerLogModuleContainer />
            </div>
        );
    }
}

