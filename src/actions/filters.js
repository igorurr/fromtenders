import { UPDATE_FILTERS } from '../constants/filters';

import { updateListPage } from './list';

import { fetchData } from './fetchData';

const updateFilters = newFilters  => {
  return {
    type: UPDATE_FILTERS,
    newFilters
  };
};

export const filterFetchData = (newFilters) => async (dispatch) => {
  dispatch(updateListPage(0));
  dispatch(updateFilters(newFilters));
  return await (fetchData( true ))(dispatch);
};