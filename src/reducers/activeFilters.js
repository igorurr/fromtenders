import { UPDATE_FILTERS } from '../constants/filters';

const initialState = {
  exp: '',
  empl: '',
  schedule: '',
  salary: '',
  sortType: ''
};

const activeFilters = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        [action.filter]: action.value
      }
    default:
      return state;
  }
};

export default activeFilters;
