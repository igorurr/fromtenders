import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const history = createBrowserHistory();

const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    ),
  ),
);

export default store;
