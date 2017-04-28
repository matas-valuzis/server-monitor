import React, { Component } from 'react';

export default class SideBar extends Component {
  render() {
    return (
        <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
              {this.props.children}
        </nav>
    );
  }
}
