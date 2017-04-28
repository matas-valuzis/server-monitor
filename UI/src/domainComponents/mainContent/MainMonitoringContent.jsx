import React, {Component} from 'react';
import ServerStatModuleContainer from '../../containers/ServerStatModuleContainer';



export default class MainMonitoringContent extends Component {
    render() {
        const servers = this.props.servers.map(s => (<ServerStatModuleContainer key={s.id} server={s} />));
        return (
            <div className="server-module log-module">
                {servers}
            </div>
        );
    }
}

