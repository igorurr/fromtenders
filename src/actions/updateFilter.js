import { UPDATE_FILTERS } from '../constants/filters';

import { updateListPage } from './list';
import { fetchData } from './fetchData';

const updateFilter = (filter, value) => {
  return {
    type: UPDATE_FILTERS,
    filter,
    value
  };
};

export const filterFetchData = (filter, value) => async (dispatch) => {
  dispatch(updateListPage(0));
  dispatch(updateFilter(filter, value));
  return await (fetchData( true ))(dispatch);
};
