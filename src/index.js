import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import createBrowserHistory from "history/createBrowserHistory";
import store from './store';
import { fetchData } from './actions/fetchData';

import App from './components/App';

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
