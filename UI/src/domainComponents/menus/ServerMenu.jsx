import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';

export default class ServerMenu extends Component {
    componentDidMount(){
        this.props.onMenuLoad(this.props.data_loaded);
    }
    render() {
        let add_selected = this.props.new ? ' active' : '';
        let keys_selected = this.props.keys ? ' active' : '';
        let dashboard_selected = this.props.dashboard ? ' active' : '';
        let serverSettingExpanded = this.props.settingsSelected ? 'collapse ' : '';



        return (
            <ul className="nav nav-pills nav-justified flex-column">
                <h1>Sermon</h1>
                <li className="nav-item">
                    <a className={"nav-link " + [dashboard_selected].join(" ")} onClick={this.props.onDashboardSelect} >Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link " + [keys_selected].join(" ")}>
                        <span onClick={() => this.props.onKeysSelect() }>Keys</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={(e) => {e.preventDefault(); this.props.onSettingsSelect();}} className={"nav-link"}>
                        Server settings:
                    </a>
                    <LinkList
                        className={"nav-pills nav-justified flex-column " + serverSettingExpanded}
                        items={this.props.servers}
                        labelResolver={(i) => i.server_name}
                        selectedItem={this.props.current_server}
                        onItemClick={this.props.onServerSelect}
                    />
                </li>
                <li className="nav-item">
                    <a className={"nav-link " + [add_selected].join(" ")}>
                        <span onClick={() => this.props.onNewSelect() }>Add new server</span>
                    </a>
                </li>
            </ul>
        );
    }
}

ServerMenu.propTypes = {
   servers: React.PropTypes.array.isRequired,         // server array
   current_server: React.PropTypes.string,            // server id
   onServerSelect: React.PropTypes.func.isRequired ,  // server selection
   onMenuLoad: React.PropTypes.func.isRequired,        // menu load
   onNewSelect: React.PropTypes.func.isRequired        // menu load
};
