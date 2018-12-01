export const REQUEST_DATA = 'REQUEST_DATA';
export const REQUEST_ANOTHER_DATA = 'REQUEST_ANOTHER_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

const requestData = search => ({
  type: REQUEST_DATA,
  search,
});

const requestAnotherData = search => ({
  type: REQUEST_ANOTHER_DATA,
  search,
})

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

export const fetchData = (search, page) => (dispatch) => {
  if (page === 0) {
    dispatch(requestAnotherData(search))
  } else {
    dispatch(requestData(search));
  }

  return fetch(`${search}&page=${page}`)
    .then(
      response => response.json(),
      (error) => {
        throw Error(error.message);
      },
    )
    .then((resolve) => {
      let info
      if (resolve.items === undefined || !resolve.items.length) {
        info = []
      }
      else {
        info = resolve.items.map(i => ({
          id: i.id,
          name: i.name,
          salary: i.salary,
          address: i.address,
          employer: i.employer,
          published_at: i.published_at,
          alternate_url: i.alternate_url,
          key_values: i.key_values,
        }))
      };
      dispatch(recieveData(info, page));
    });
};
