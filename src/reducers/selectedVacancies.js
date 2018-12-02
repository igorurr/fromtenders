import {
  ADD_VACANCY,
  REMOVE_VACANCY
} from '../constants/selectVacancy';

import { currentSelectedVacancies } from '../localStorrage';

const initialState = currentSelectedVacancies;

const selectedVacancies = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VACANCY:
      return [...state, action.vac];
    case REMOVE_VACANCY:
      return state.filter(s => s.id !== action.vac.id);
    default:
      return state;
  }
};

export default selectedVacancies;
