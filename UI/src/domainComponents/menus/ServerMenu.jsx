import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';

export default class ServerMenu extends Component {
  componentDidMount(){
    this.props.onMenuLoad();
  }
  render() {
    return (
      <div className="server-menu">
        <LinkList
          items={this.props.servers}
          labelResolver={(i) => i.server_name}
          selectedItem={this.props.current_server}
          onItemClick={this.props.onServerSelect}
        />
      </div>
    );
  }
}

ServerMenu.propTypes = {
   servers: React.PropTypes.array.isRequired,         // server array
   current_server: React.PropTypes.string,            // server id
   onServerSelect: React.PropTypes.func.isRequired ,  // server selection
   onMenuLoad: React.PropTypes.func.isRequired        // menu load
}
