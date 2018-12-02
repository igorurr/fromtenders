import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { Header } from './index'
import { Error, Page1, Page2 } from '../containers';
import '../css/App.css';
import { fetchData } from "../actions/fetchData";
import { connect } from "react-redux";

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route exact path={'/'} component={Page1} />
            <Route path={'/map'} component={Page2} />
          </Switch>
          <Error />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    this.props.defaultFetchData();
  }
}

const mapDispatchToProps = dispatch => ({
  defaultFetchData: () => dispatch(fetchData( true ))
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
