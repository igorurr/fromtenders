import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import mapCenter from './mapCenter';
import receivedData from './receivedData';
import selectedVacancies from './selectedVacancies';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  mapCenter,
  receivedData,
  selectedVacancies,
});

export default rootReducer;
