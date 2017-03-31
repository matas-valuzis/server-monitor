import React, {Component} from 'react';
import ItemEditList from '../../components/lists/ItemEditList.jsx';

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
            check = <div>
                <span className={ "col-sm-2 col-form-label "+ conClass}>{connected}</span>
                <span style={{display: displayErr}} className="col-sm-2 col-form-label error">Error: {this.props.server.connection_check.error}</span>
            </div>;
        }
        const logList = <ItemEditList
            items={logs}
            labelResolver={l => `${l.name} at ${l.path}`}
            actionResolver={l => {
                return [<span><button onClick={(e) => this.onLogDelete(e, l)}>delete</button></span>]
            }}
        />;
        return (
            <div className="container">
                <div className="row">
                    <button className="col-sm-2 col-form-button" onClick={this.onCheck}>Check connection</button>
                    {check}
                </div>
                <br/>
              <form  onSubmit={this.onSubmit}>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Name:</label>
                  <div className="col-sm-10">
                      {this.props.server.server_name}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Adress:</label>
                  <div className="col-sm-10">
                      {this.props.server.address}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 col-form-label">Identity file:</label>
                  <div className="col-md-10">
                      {this.props.server.private_key}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">User:</label>
                  <div className="col-sm-10">
                      {this.props.server.user}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2">Sudo</label>
                  <div className="col-sm-10">
                    <div className="form-check">
                        {this.props.server.sudo ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
                  <div>
                      {logList}
                  </div>
                  <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Add log</label>
                      <div className="col-sm-10">
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
                          <button onClick={this.onNewLogAdd}>add</button>
                      </div>
                  </div>
                <button onClick={this.onDelete}>Delete</button>
              </form>
            </div>
        );
    }
}
