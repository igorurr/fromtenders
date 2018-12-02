import {
  UPDATE_MAP_SELECTED_ADDRESS,
  UPDATE_MAP_VISIBLE_DATA
} from '../constants/map';

import { fetchData } from './fetchData'

export const updateMapVisibleData = newVisibleData  => {
  return {
    type: UPDATE_MAP_VISIBLE_DATA,
    newVisibleData: newVisibleData
  };
};

export const updateMapSelectedAddress = newAddress => {
  return {
    type: UPDATE_MAP_SELECTED_ADDRESS,
    newAddress: newAddress
  };
};


export const mapFetchData = (newAddress) => async (dispatch) => {

};