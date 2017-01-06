import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import MainContent from './MainContent.jsx';
export default class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <SideBar content={ this.props.sidebarContent } />
        <MainContent content={ this.props.mainContent } />
      </div>
    );
  }
}
