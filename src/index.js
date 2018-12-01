import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';
import { fetchData } from './actions/fetchData';

import App from './components/App';

const origPath = 'https://api.hh.ru/vacancies?text=Frontend&area=1';
store.dispatch(fetchData(origPath, 0));

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'),
);
