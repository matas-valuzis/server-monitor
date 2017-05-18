import React, { Component } from 'react';

export default class MainContent extends Component {
  render() {
    return (
        <main className="container-fluid">
          <div className="row mainContent">
              {this.props.children}
          </div>
        </main>
    );
  }
}
