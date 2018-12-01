import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import map from './map';
import receivedData from './receivedData';
import selectedVacancies from './selectedVacancies';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  map,
  receivedData,
  selectedVacancies,
});

export default rootReducer;
