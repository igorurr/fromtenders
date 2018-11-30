import {UPDATE_ACTIVE} from "../constants/map";

const initialState = {
  activeAddress: []
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE:
      return {
        ...state,
        activeAddress: action.activeAddress,
      };
    default:
      return state;
  }
};

export default map;
