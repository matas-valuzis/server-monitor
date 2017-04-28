import React, { Component } from 'react';

export default class MainContent extends Component {
  render() {
    return (
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <div className="main">
              {this.props.children}
          </div>
        </main>
    );
  }
}
