import React, { Component } from 'react';
import $ from 'jquery';


export default class SideBar extends Component {
  render() {
    return (
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                        {this.props.children}
                </ul>
            </div>
    );
  }
}
