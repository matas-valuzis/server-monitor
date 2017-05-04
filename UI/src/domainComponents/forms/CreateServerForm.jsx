import React, {Component} from 'react';

export default class CreateServerForm extends Component {

  componentDidMount(){
    this.props.onFormLoad(this.props.data_loaded);
  }

  onSubmit = (e) => {
      e.preventDefault();
      let server = {
          server_name: this.name.value,
          address: this.address.value,
          private_key: this.key.value,
          user: this.user.value,
          sudo: this.sudo.checked
      };
      this.props.onSubmit(server);
  };
  render() {
    let keyOptions = this.props.keys.map(k => (<option key={k} value={k}>{k}</option>));
    return (

      <div className="container">
          <h1>Add new server</h1>
        <div className="row">
        <div className="card">
            <div className="card-block">
                <h4 className="card-title">Enter new server details</h4>
                <form  onSubmit={this.onSubmit}>
                    <div className="form-group has-error">
                        <span className="error text-danger">{this.props.error}</span>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name:</label>
                        <div className="col-sm-10">
                            <input
                                required
                                type="text"
                                id="imputName"
                                className="form-control"
                                placeholder="Name"
                                ref={(i) => this.name = i}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Adress:</label>
                        <div className="col-sm-10">
                            <input
                                required
                                type="text"
                                id="imputAddress"
                                className="form-control"
                                placeholder="Address"
                                ref={(i) => this.address = i}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 col-form-label">Identity file:</label>
                        <div className="col-md-10">
                            <select className="form-control" required ref={(i) => this.key = i}>
                                {keyOptions}
                            </select>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">User:</label>
                        <div className="col-sm-10">
                            <input
                                required
                                type="text"
                                id="inputUser"
                                className="form-control"
                                placeholder="Server user"
                                ref={(i) => this.user = i}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">Sudo</label>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        id="inputSudo"
                                        className="form-check-input"
                                        placeholder="Sudo"
                                        ref={(i) => this.sudo = i}
                                    /> User is in sudoer list
                                </label>
                            </div>
                        </div>
                    </div>
                    <input className="btn btn-primary" value="Create" type="submit" />
                </form>
            </div>
        </div>

    </div>
      </div>
    );
  }
}
