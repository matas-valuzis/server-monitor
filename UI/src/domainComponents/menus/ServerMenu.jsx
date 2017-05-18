import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';
import FontAwesome from 'react-fontawesome';

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
                <h1 className="brand">Sermon</h1>

                <li className="nav-item customItem">
                    <a className={"nav-link customLink " + [dashboard_selected].join(" ")} onClick={this.props.onDashboardSelect} ><FontAwesome name='tachometer' /> Dashboard</a>
                </li>
                <li className="nav-item customItem">
                    <a className={"nav-link customLink " + [keys_selected].join(" ")} onClick={() => this.props.onKeysSelect() }><FontAwesome name='key' /> Keys</a>
                </li>
                <li className="nav-item customItem">
                    <a onClick={(e) => {e.preventDefault(); this.props.onSettingsSelect();}} className={"nav-link customLink"}><FontAwesome name='wrench' /> Server settings:</a>
                    <LinkList
                        className={"nav-pills nav-justified flex-column " + serverSettingExpanded}
                        items={this.props.servers}
                        labelResolver={(i) => i.server_name}
                        selectedItem={this.props.current_server}
                        onItemClick={this.props.onServerSelect}
                    />
                </li>
                <li className="nav-item customItem">
                    <a className={"nav-link customLink " + [add_selected].join(" ")} onClick={() => this.props.onNewSelect() }><FontAwesome name='plus' /> Add new server</a>
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
