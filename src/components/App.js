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

// Я хочу перенести LeftBar за пределы Switch, как с Header ниже. Сейчас он и в Page1, и в Page2.
// Когда я это делаю, все прорисовывается, но как блоки, один под другим.
// Чтобы так не было, я проставляю, например, id тому div, что прямо под Router, и указываю ему display: flex.
// Все при этом отображается как надо, в том числе список. Но карта не прорисовывается (данные приходят, но экран не меняется).
// Убираю этот flex, все нормально, но, опять же, блоками.
// Есть идея, в чем может быть дело? Или где посмотреть. 
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
