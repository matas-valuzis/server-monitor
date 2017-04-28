import React, {Component} from 'react';
import ServerLogModuleContainer from '../../containers/ServerLogModuleContainer';
import ServerDiskModuleContainer from '../../containers/ServerDiskModuleContainer';
import ServerComputingModuleContainer from '../../containers/ServerComputingModuleContainer';


export default class ServerMonitoringContent extends Component {

    render() {
        return (
            <div className="server-module log-module">
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Server storage</h4>
                        <ServerDiskModuleContainer serverId={this.props.server.id} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Computing</h4>
                        <ServerComputingModuleContainer serverId={this.props.server.id} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Server logs</h4>
                        <ServerLogModuleContainer serverId={this.props.server.id} />
                    </div>
                </div>
            </div>
        );
    }
}

