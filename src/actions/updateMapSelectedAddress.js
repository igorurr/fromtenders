export const UPDATE_MAP_SELECTED_ADDRESS = 'UPDATE_MAP_SELECTED_ADDRESS';

export const updateMapSelectedAddress = newAddress => {
  return {
    type: UPDATE_MAP_SELECTED_ADDRESS,
    center: newAddress
  };
};
