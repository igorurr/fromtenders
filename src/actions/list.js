import { UPDATE_LIST_PAGE } from '../constants/list';

import { fetchData } from './fetchData';

export const updateListPage = newPage  => {
  return {
    type: UPDATE_LIST_PAGE,
    newPage
  };
};

export const listFetchData = (newPage) => async (dispatch) => {
  dispatch(updateListPage(newPage));
  return await (fetchData( false ))(dispatch);
};