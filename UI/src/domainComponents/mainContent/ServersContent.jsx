import React, {Component} from 'react';
import ItemEditList from '../../components/lists/ItemEditList.jsx';
import InlineTextFieldEdit from '../../components/forms/InlineTextFieldEdit.jsx';

export default class ServerContent extends Component {


    static onSubmit(e) {
        e.preventDefault();
    }

    onNewLogAdd = (e) =>{
        e.preventDefault();
        const log = {
            name: this.newLogName.value,
            path: this.newLogPath.value
        };
        this.props.onNewLogAdd(this.props.server, log);
        this.newLogName.value = '';
        this.newLogPath.value = '';
    };

    onLogDelete = (e, log) => {
        e.preventDefault();
        this.props.onLogDelete(this.props.server, log.id);
    };

    onDelete = (e) => {
        e.preventDefault();
        let id = this.props.server._id;
        this.props.onDelete(id);
    };

    onCheck = (e) => {
        e.preventDefault();
        let id = this.props.server._id;
        this.props.onCheck(id);
    };

    render() {
        const logs = this.props.server.logs.map(l => Object.assign({id : l._id}, l));
        let check = '';
        if (this.props.server.connection_check){
            let connected = this.props.server.connection_check.connected ? 'Connection working' : `Could not connect!`;
            let conClass = !this.props.server.connection_check.connected ? 'offline' : `online`;
            let displayErr = !this.props.server.connection_check.connected ? 'block' : 'none';
            check = <div className="inline">
                <span className={ ""+ conClass}>{connected}</span>
                <span style={{display: displayErr}} className="error">Error: {this.props.server.connection_check.error}</span>
            </div>;
        }
        const logList = <ItemEditList
            items={logs}
            labelResolver={l => `${l.name} at ${l.path}`}
            actionResolver={l => {
                return [<span><button className="btn btn-primary" onClick={(e) => this.onLogDelete(e, l)}>Remove</button></span>]
            }}
        />;
        return (
            <div className="log-module">
                <h1>{this.props.server.server_name} settings</h1>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Server info</h4>
                    </div>

                    <div className="card-block">
                        <button className="inline btn btn-primary" onClick={this.onCheck}>Check connection</button>
                        {check}
                    </div>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><InlineTextFieldEdit onValueChange={name => this.props.onNameUpdate(this.props.server.id, name)} label="Name" value={this.props.server.server_name} /></li>
                        <li className="list-group-item"><InlineTextFieldEdit onValueChange={address => this.props.onAddressUpdate(this.props.server.id, address)} label="Adress" value={this.props.server.address} /></li>
                        <li className="list-group-item"><b>User:</b> {this.props.server.user}</li>
                        <li className="list-group-item"><b>Sudo available:</b> {this.props.server.sudo ? 'Yes' : 'No'}</li>
                        <li className="list-group-item"><b>Identity file:</b> {this.props.server.private_key}</li>
                    </ul>
                    <div className="card-block">
                        <button className="btn btn-primary" onClick={this.onDelete}>Remove server and data</button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Server log files</h4>

                    </div>
                    <div>
                        {logList}
                    </div>
                    <div className="card-block">
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <form onSubmit={this.onNewLogAdd}>
                                <input
                                    type="text"
                                    id="inputLogName"
                                    className="form-control"
                                    placeholder="Log name"
                                    ref={(i) => this.newLogName = i}
                                />
                                <input
                                    type="text"
                                    id="inputLog"
                                    className="form-control"
                                    placeholder="Log path"
                                    ref={(i) => this.newLogPath = i}
                                />
                                </form>
                                <button className="btn btn-primary" onClick={this.onNewLogAdd}>Add new log file</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
