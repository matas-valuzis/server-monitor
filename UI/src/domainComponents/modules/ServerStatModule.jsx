import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';


export default class ServerStatModule extends Component {
    onServerSelect = (e) => {
        e.preventDefault();
        this.props.onServerSelect(this.props.server);
    };

    render() {
        return (
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-block">
                        <h2 className="card-title ">{this.props.server.server_name}</h2>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><FontAwesome className="mainColor" name='th-large' /> RAM used: <h3>{Math.round(this.props.computing.used_ram / (10.24*1024))/100} MB</h3></li>
                        <li className="list-group-item"><FontAwesome className="mainColor" name='bolt' /> CPU utilization: <h3>{this.props.computing.used_cpu}%</h3></li>
                        <li className="list-group-item"><FontAwesome className="mainColor" name='th-list' /> Tasks running: <h3>{this.props.computing.tasks}</h3></li>
                    </ul>
                    <div className="card-footer">
                        <a href="#" className="card-link" onClick={this.onServerSelect}>More</a>
                    </div>
                </div>
            </div>
        );
    }
}

