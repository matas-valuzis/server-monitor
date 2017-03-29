import React, {Component} from 'react';

export default class ServerContent extends Component {


    static onSubmit(e) {
        e.preventDefault();
    }

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
                <button onClick={this.onDelete}>Delete</button>
              </form>
            </div>
        );
    }
}
