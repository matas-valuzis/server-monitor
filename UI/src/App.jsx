import React, { Component } from 'react';
import { Provider } from 'react-redux'
import MainPageContainer from './containers/MainPageContainer.js';
import store from './store';

require('./css/main.css');

export default class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <MainPageContainer />
      </Provider>
    );
  }
}
