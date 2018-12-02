import {
  ADD_VACANCY,
  REMOVE_VACANCY
} from '../constants/selectVacancy';

import { updateCurrentSelectedVacancies } from '../localStorrage';

const addVacancy = vac => ({
  type: ADD_VACANCY,
  vac,
});

const removeVacancy = vac => ({
  type: REMOVE_VACANCY,
  vac,
});


export const addIfNotExist = vac => (dispatch, getState) => {
  const selected = getState().selectedVacancies;

  if ( selected.find( (el)=>el.id === vac.id ) === undefined ) {
    dispatch(addVacancy(vac));

    updateCurrentSelectedVacancies(getState().selectedVacancies);
  }
};

export const removeIfExist = vac => (dispatch, getState) => {
  const selected = getState().selectedVacancies;

  if ( selected.find( (el)=>el.id === vac.id ) !== undefined ) {
    dispatch(removeVacancy(vac));

    updateCurrentSelectedVacancies(getState().selectedVacancies);
  }
};
