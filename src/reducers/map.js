import { UPDATE_MAP_POSITION } from '../actions/updateMapPosition';

const map = (state = [], action) => {
  switch (action.type) {
    case UPDATE_MAP_POSITION:
      return action.center
    default:
      return state;
  }
};

export default map;
