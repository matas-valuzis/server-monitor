import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';

export default class ServerOnlineModule extends Component {
    componentDidMount(){
    this.props.onModuleLoad();
    }
    render() {
        let online = this.props.data.online ? 'Online' : 'Offline';
        return (
            <div className="server-module online-module">
              <h3>{this.props.server.server_name} is {online}</h3>

            </div>
        );
    }
}

