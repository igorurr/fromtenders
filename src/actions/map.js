import {
  UPDATE_MAP_SELECTED_ADDRESS,
  UPDATE_MAP_VISIBLE_DATA
} from '../constants/map';

import { updateListPage } from './list';

import { fetchData } from './fetchData';

const updateMapVisibleData = newVisibleData  => {
  return {
    type: UPDATE_MAP_VISIBLE_DATA,
    newVisibleData
  };
};

export const updateMapSelectedAddress = newAddress => {
  return {
    type: UPDATE_MAP_SELECTED_ADDRESS,
    newAddress
  };
};


export const mapFetchData = (newAddress) => async (dispatch) => {
  dispatch(updateListPage(0));
  dispatch(updateMapVisibleData(newAddress));
  return await (fetchData( true ))(dispatch);
};