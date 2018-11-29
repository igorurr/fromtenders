import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { Page1, Page2 } from './containers'
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path={'/'} component={Page1} />
            <Route path={'/map'} component={Page2} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
