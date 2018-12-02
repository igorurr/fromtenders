import { INPUT_SEARCH } from '../constants/inputSearch';

const inputSearch = (state = '', action) => {
  switch (action.type) {
    case INPUT_SEARCH:
      return action.text;
    default:
      return state;
  }
}

export default inputSearch;
