import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';

export default class ServerMenu extends Component {
    componentDidMount(){
    this.props.onMenuLoad(this.props.data_loaded);
    }
    render() {
        let selected = this.props.new ? 'selected' : '';
        let dashboard_selected = this.props.dashboard ? 'selected' : '';
        return (
            <div className="server-menu">
              <h3 className={[dashboard_selected].join(" ")} onClick={this.props.onDashboardSelect}>Dashboard</h3>
              <h3>Server settings:</h3>
            <LinkList
              items={this.props.servers}
              labelResolver={(i) => i.server_name}
              selectedItem={this.props.current_server}
              onItemClick={this.props.onServerSelect}
            />
              <h4 className={[selected].join(" ")}>
                  <span onClick={() => this.props.onNewSelect() }>Add new server</span>
              </h4>

            </div>
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
