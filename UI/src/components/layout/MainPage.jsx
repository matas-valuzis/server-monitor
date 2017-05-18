import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import MainContent from './MainContent.jsx';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';

export default class MainPage extends Component {
  constructor(props){
      super(props);
      this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
      if($("#wrapper").hasClass("toggled")){
          $("#wrapper").removeClass("toggled");
      } else {
          $("#wrapper").addClass("toggled");
      }
  };

  render() {
    const content = this.props.content || this.props.children;



      return (
      <div id="wrapper" className="toggled">
        <a href="#menu-toggle" onClick={this.toggleMenu} className="toggleIcon" id="menu-toggle"><FontAwesome className="iconMenu" name='bars' /></a>
          {content}
      </div>
    );
  }
}
