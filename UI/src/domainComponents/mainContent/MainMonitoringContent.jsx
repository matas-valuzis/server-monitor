import React, {Component} from 'react';



export default class MainMonitoringContent extends Component {

    onServerSelect = (s) => {
        this.props.onServerSelect(s);
    };

    render() {
        const servers = this.props.servers.map(s => (<span onClick={() => this.onServerSelect(s)} key={s.id}>{s.server_name}</span>));
        return (
            <div className="server-module log-module">
                {servers}
            </div>
        );
    }
}

