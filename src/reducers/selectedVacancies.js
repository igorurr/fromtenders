import {
  ADD_VACANCY,
  REMOVE_VACANCY
} from '../constants/selectVacancy';

const selectedVacancies = (state = [], action) => {
  switch (action.type) {
    case ADD_VACANCY:
      return [...state, action.vac];
    case REMOVE_VACANCY:
      return state.filter(s => s !== action.vac);
    default:
      return state;
  }
};

export default selectedVacancies;
