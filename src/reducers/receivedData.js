import {
  REQUEST_DATA,
  RECEIVE_DATA,
} from '../actions/fetchData';

const initialState = {
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
