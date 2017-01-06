import React, { Component } from 'react';

export default class Login extends Component {


  render() {
    const submit = (e) => {
        e.preventDefault();
        this.props.onLogin(this.props.email, this.props.password);
    };
    const hidden = this.props.error ? '' : ' hidden';
    return (
      <div className="container">
        <form className="form-signin" onSubmit={submit}>

          <h2 className="form-signin-heading">Please login</h2>
          <div className={ 'login-error' + hidden}>
            {this.props.error}
          </div>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={this.props.email}
            onChange={(e) => this.props.onEmailChange(e.target.value)}
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.props.password}
            onChange={(e) => this.props.onPasswordChange(e.target.value)}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  onPasswordChange: React.PropTypes.func.isRequired,
  onEmailChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
  onLogin: React.PropTypes.func.isRequired
}
