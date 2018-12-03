import { UPDATE_LIST_PAGE } from '../constants/list';

const loadedPages = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_LIST_PAGE:
      return action.newPage;
    default:
      return state;
  }
};

export default loadedPages;
