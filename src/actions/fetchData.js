export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

const requestData = () => ({
  type: REQUEST_DATA,
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

export const fetchData = page => (dispatch) => {
  const api = 'https://api.hh.ru/vacancies?text=Frontend';
  dispatch(requestData());
  return fetch(`${api}&page=${page}`)
    .then(
      response => response.json(),
      (error) => {
        throw Error(error.message);
      },
    )
    .then((resolve) => {
      const info = resolve.items.map(i => ({
        id: i.id,
        name: i.name,
        salary: i.salary,
        address: i.address,
        employer: i.employer,
        published_at: i.published_at,
        alternate_url: i.alternate_url,
        snippet: i.snippet,
      }));
      dispatch(recieveData(info, page));
    });
};
