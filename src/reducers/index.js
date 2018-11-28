import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import receivedData from './receivedData';
import selectedVacancies from './selectedVacancies';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  receivedData,
  selectedVacancies,
});

export default rootReducer;