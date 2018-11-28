export const ADD_VACANCY = 'ADD_VACANCY';
export const REMOVE_VACANCY = 'REMOVE_VACANCY';

const addVacancy = vac => ({
  type: ADD_VACANCY,
  vac,
});

const removeVacancy = vac => ({
  type: REMOVE_VACANCY,
  vac,
});


export const addIfNotExist = vac => (dispatch, getState) => {
  const { selected } = getState().selectedVacancies;
  if (selected.indexOf(vac) === -1) {
    dispatch(addVacancy(vac));
  }
};

export const removeIfExist = vac => (dispatch, getState) => {
  const { selected } = getState().selectedVacancies;
  if (selected.indexOf(vac) !== -1) {
    dispatch(removeVacancy(vac));
  }
};
