import { vacancyRequestAdapter } from '../helpers';

import {
  REQUEST_NEXT_DATA,
  REQUEST_ANOTHER_DATA,
  RECEIVE_DATA,
  RECEIVE_FAIL
} from '../constants/fetchData';

const requestNextData = search => ({
  type: REQUEST_NEXT_DATA,
  search,
});

const requestAnotherData = search => ({
  type: REQUEST_ANOTHER_DATA,
  search,
});

const recieveData = (data, page) => {
  const d = new Date();
  const t = `${d.toLocaleTimeString('ru-RU')}.${d.getMilliseconds()}`;
  return {
    type: RECEIVE_DATA,
    items: data,
    page,
    receivedAt: t,
  };
};

const receiveFail = () => ({
  type: RECEIVE_FAIL,
});


export const defaultFetchData = () =>  {};

export const mapFetchData = () =>  {};

export const listFetchData = () =>  {};

export const fetchData = (search, page) => async (dispatch) => {
  page === 0
    ? dispatch(requestAnotherData(search))
    : dispatch(requestNextData(search));

  return await fetch(`${search}&page=${page}`)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => dispatch(
        recieveData(vacancyRequestAdapter(data),page)
      ))
    .catch(error => {
      dispatch(receiveFail());
      console.log(error)
      throw new Error(error.statusText)
    });
};
