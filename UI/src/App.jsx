import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux';
import SideBar from './components/layout/SideBar.jsx';
import MainContent from './components/layout/MainContent.jsx';
import MainPageContainer from './containers/MainPageContainer';
import LoginContainer from './containers/LoginContainer';
import CreateServerFormContainer from './containers/CreateServerFormContainer';
import ServerMenuContainer from './containers/ServerMenuContainer';
import ServerContentContainer from './containers/ServerContentContainer';
import ServerMonitoringContentContainer from './containers/ServerMonitoringContentContainer';
import MainMonitoringContentContainer from './containers/MainMonitoringContentContainer';
import MainPageLoaderContainer from './containers/MainPageLoaderContainer';

import {store, history} from './store';

require('./css/main.css');

export default class App extends Component {
  render() {

    return (

    <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
        <Route exact={true} path="/" component={MainPageLoaderContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/dashboard/:action?/:serverId?" render={(m) => (
            <MainPageContainer >
            <SideBar>
                <ServerMenuContainer params={m.match.params || {}} />
            </SideBar>
            <MainContent>
                <Route path="/dashboard/new" component={CreateServerFormContainer} />
                <Route path="/dashboard/edit/:serverId" render={(m) => {
                  return (<ServerContentContainer serverId={m.match.params.serverId} />);
                }}/>
                <Route path="/dashboard/monitor/:serverId" render={(m) => {
                    return (<ServerMonitoringContentContainer serverId={m.match.params.serverId} />);
                }}/>
                <Route exact={true} path="/dashboard" component={MainMonitoringContentContainer}/>
            </MainContent>
            </MainPageContainer>
        )} />
          </div>
        </ConnectedRouter>
    </Provider>
    );
  }
}
