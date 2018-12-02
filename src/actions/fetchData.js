import { vacancyRequestAdapter } from '../helpers';
import store from '../store';

import {
  REQUEST_NEXT_DATA,
  REQUEST_ANOTHER_DATA,
  RECEIVE_DATA,
  RECEIVE_FAIL,
  ORIG_PATH
} from '../constants/fetchData';

const requestNextData = search =>({
  type: REQUEST_NEXT_DATA,
  search
});

const requestAnotherData = search => ({
  type: REQUEST_ANOTHER_DATA,
  search,
});


const recieveData = (data) => {
  const d = new Date();
  const t = `${d.toLocaleTimeString('ru-RU')}.${d.getMilliseconds()}`;
  return {
    type: RECEIVE_DATA,
    items: data,
    receivedAt: t
  };
};

const receiveFail = () => ({
  type: RECEIVE_FAIL,
});


export const fetchData = ( loadingNewData ) => async (dispatch) => {
  const storeState = store.getState();

  let query = `${ORIG_PATH}&page=${storeState.list.page}`;

  const {
    exp,
    empl,
    schedule,
    salary,
    sortType,
  } = storeState.filters;

  if( typeof exp === 'string' && exp.length > 0)
    query += `${exp}`;

  if( typeof empl === 'string' && empl.length > 0)
    query += `${empl}`;

  if( typeof schedule === 'string' && schedule.length > 0)
    query += `${schedule}`;

  if( typeof salary === 'string' && salary.length > 0)
    query += `${salary}`;

  if( typeof sortType === 'string' && sortType.length > 0)
    query += `${sortType}`;

  const {
    bottom_lat,
    left_lng,
    top_lat,
    right_lng
  } = storeState.map.visibleData.bounds;

  if(
    typeof bottom_lat === 'number'
    && typeof left_lng === 'number'
    && typeof top_lat === 'number'
    && typeof right_lng === 'number'
  )
    query += `&top_lat=${top_lat}&bottom_lat=${bottom_lat}&left_lng=${left_lng}&right_lng=${right_lng}`;

  if( loadingNewData )
    dispatch(requestAnotherData(query));
  else
    dispatch(requestNextData(query));

  return await fetch(query)
    .then(res => {
      if (!res.ok) throw new Error(res);
      return res.json();
    })
    .then(data => dispatch(
      recieveData(vacancyRequestAdapter(data))
    ))
    .catch(error => {
      dispatch(receiveFail());
      throw new Error(error)
    });
};
