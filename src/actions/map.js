import {UPDATE_ACTIVE} from "../constants/map";

const updateActive = (newAddress) => {
  return {
    type: UPDATE_ACTIVE,
    activeAddress: newAddress
  };
};

export { updateActive };