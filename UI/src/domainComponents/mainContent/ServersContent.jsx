import React, {Component} from 'react';

export default class ServerContent extends Component {
  render() {
    return (
      <div className="server-content">
        <dl>
          <dt>Server name:</dt>
          <dd>{ this.props.name }</dd>
          <dt>Server address:</dt>
          <dd>{ this.props.address }</dd>
        </dl>
      </div>
    );
  }
}
