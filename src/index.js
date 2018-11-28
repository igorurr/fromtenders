import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import createBrowserHistory from "history/createBrowserHistory";
import store from './store';
import { fetchData } from './actions/fetchData';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

store.dispatch(fetchData(0));
const history = createBrowserHistory();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
