import {
  REQUEST_DATA,
  REQUEST_ANOTHER_DATA,
  RECEIVE_DATA,
} from '../actions/fetchData';

const initialState = {
  search: '',
  isFetching: false,
  loadedPage: 0,
  items: [],
  receivedAt: '',
};

const receivedData = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        search: action.search,
        isFetching: true,
      };
    case REQUEST_ANOTHER_DATA:
      return {
        ...state,
        items: [],
        search: action.search,
        isFetching: true,
      };
    case RECEIVE_DATA:
      return {
        ...state,
        isFetching: false,
        items: state.items.concat(action.items),
        loadedPage: action.page,
        receivedAt: action.receivedAt,
      };
    default:
      return state;
  }
};

export default receivedData;
