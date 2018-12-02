import {
  UPDATE_MAP_SELECTED_ADDRESS,
  UPDATE_MAP_VISIBLE_DATA
} from '../constants/map';

const initialState = {
  activeAddress: [],
  visibleData: {
    bounds:{ },
    center: [55.76, 37.59],
    zoom: 11
  }
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAP_SELECTED_ADDRESS:
      return {
        ...state,
        activeAddress: action.newAddress
      };
    case UPDATE_MAP_VISIBLE_DATA:
      return {
        ...state,
        visibleData: action.newVisibleData
      };
    default:
      return state;
  }
};

export default map;
