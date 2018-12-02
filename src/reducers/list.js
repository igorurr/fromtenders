import {
  UPDATE_LIST_PAGE
} from '../constants/list';

const initialState = {
  page: 0
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST_PAGE:
      return {
        ...state,
        page: action.newPage
      };
    default:
      return state;
  }
};

export default list;
