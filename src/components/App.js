import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { Header } from './index'
import { ListVacancies, SelectedVacancies, MapVacancies } from '../components'
import { Error, LeftBar } from '../containers';
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
            <main id={"app"} style={{ height: (window.innerHeight-40)+"px" }}>
              <LeftBar />
              <Route exact path={'/'} component={ListVacancies} />
              <Route path={'/selected'} component={SelectedVacancies} />
              <Route path={'/map'} component={MapVacancies} />
            </main>
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
