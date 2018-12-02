import {
  REQUEST_NEXT_DATA,
  REQUEST_ANOTHER_DATA,
  RECEIVE_DATA,
  RECEIVE_FAIL
} from '../constants/fetchData';

const initialState = {
  search: '',
  isFetching: false,
  items: [],
  receivedAt: '',
  fail: false
};

const receivedData = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEXT_DATA:
      return {
        ...state,
        search: action.search,
        isFetching: true,
        fail: false,
      };
    case REQUEST_ANOTHER_DATA:
      return {
        ...state,
        items: [],
        search: action.search,
        isFetching: true,
        fail: false
      };
    case RECEIVE_DATA:
      return {
        ...state,
        isFetching: false,
        items: state.items.concat(action.items),
        receivedAt: action.receivedAt,
        fail: false
      };
    case RECEIVE_FAIL:
      return {
        ...state,
        isFetching: false,
        fail: true,
      };
    default:
      return state;
  }
};

export default receivedData;
