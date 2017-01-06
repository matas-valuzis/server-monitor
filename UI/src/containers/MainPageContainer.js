import React from 'react';
import { connect } from 'react-redux';
import MainPage from '../components/layout/MainPage.jsx';
import ServerMenuContainer from './ServerMenuContainer.js';
import ServerContentContainer from './ServerContentContainer.js';
import LoginContainer from './LoginContainer';
import CreateServerFormContainer from './CreateServerFormContainer';

const mapStateToProps = (state) => {
    let sideBarContent = {};
    let mainContent = {};
    if(!state.authentication.authenticated){
      sideBarContent = '';
      mainContent = <LoginContainer />;
    }
    else{
      sideBarContent = <ServerMenuContainer />;
      mainContent = <CreateServerFormContainer />;
    }

    return {
      sidebarContent: sideBarContent,
      mainContent: mainContent
    };
};

export default connect(mapStateToProps)(MainPage);
