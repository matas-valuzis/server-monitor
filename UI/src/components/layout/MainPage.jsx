import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import MainContent from './MainContent.jsx';
export default class MainPage extends Component {
  render() {
    const content = this.props.content || this.props.children;
    return (
      <div className="main-page">
          {content}
      </div>
    );
  }
}
