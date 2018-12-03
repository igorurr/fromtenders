import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import loadedPages from './loadedPages';
import map from './map';
import activeFilters from './activeFilters';
import receivedData from './receivedData';
import selectedVacancies from './selectedVacancies';
import inputSearch from './inputSearch';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  loadedPages,
  map,
  activeFilters,
  receivedData,
  selectedVacancies,
  inputSearch,
});

export default rootReducer;
