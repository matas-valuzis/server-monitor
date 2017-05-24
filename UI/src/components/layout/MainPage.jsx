import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class MainPage extends Component {
  constructor(props){
      super(props);
      this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e){
      e.preventDefault();
      this.props.toggleMenu();
  };


  render() {
    const content = this.props.content || this.props.children;
    const toggleMenu = !this.props.menu ? '' : 'toggled';

    return (
        <div id="wrapper" className={toggleMenu}>
        <a href="#menu-toggle" onClick={this.toggleMenu} className="toggleIcon" id="menu-toggle"><FontAwesome className="iconMenu" name='bars' /></a>
          {content}
        </div>
    );
  }
}
