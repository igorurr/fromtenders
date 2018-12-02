import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import list from './list';
import map from './map';
import filters from './filters';
import receivedData from './receivedData';
import selectedVacancies from './selectedVacancies';
import inputSearch from './inputSearch';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  list,
  map,
  filters,
  receivedData,
  selectedVacancies,
  inputSearch,
});

export default rootReducer;
