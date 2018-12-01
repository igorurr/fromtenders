export const UPDATE_MAP_SELECTED_ADDRESS = 'UPDATE_MAP_SELECTED_ADDRESS';
export const UPDATE_MAP_VISIBLE_DATA = 'UPDATE_MAP_VISIBLE_DATA';

export const updateMapSelectedAddress = newAddress => {
  return {
    type: UPDATE_MAP_SELECTED_ADDRESS,
    newAddress: newAddress
  };
};