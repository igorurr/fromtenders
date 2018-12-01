import { UPDATE_MAP_CENTER } from '../actions/updateMapCenter';

const mapCenter = (state = [], action) => {
  switch (action.type) {
    case UPDATE_MAP_CENTER:
      return action.center
    default:
      return state;
  }
};

export default mapCenter;
