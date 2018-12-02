import {
  UPDATE_FILTERS
} from '../constants/filters';

const initialState = {
  state: {
    exp: '',
    empl: '',
    schedule: '',
    salary: '',
    sortType: ''
  }
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        state: action.newFilters
      };
    default:
      return state;
  }
};

export default filters;
