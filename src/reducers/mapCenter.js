import { UPDATE_MAP_CENTER } from '../actions/updateMapCenter';

const initialState = {
  activeCenter: []
};

const mapCenter = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAP_CENTER:
      return {
        ...state,
        activeCenter: action.center,
      };
    default:
      return state;
  }
};

export default mapCenter;
