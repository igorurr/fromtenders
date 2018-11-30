import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';
import { fetchData } from './actions/fetchData';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const origPath = 'https://api.hh.ru/vacancies?text=Frontend&area=113';
store.dispatch(fetchData(origPath, 0));

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
