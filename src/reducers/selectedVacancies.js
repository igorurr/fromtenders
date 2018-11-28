import { ADD_VACANCY, REMOVE_VACANCY } from '../actions/selectVacancy';

const initialState = {
  selected: [],
};

const selectedVacancies = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VACANCY:
      return {
        ...state,
        selected: [...state.selected, action.vac],
      };
    case REMOVE_VACANCY:
      return {
        ...state,
        selected: state.selected.filter(s => s !== action.vac),
      };
    default:
      return state;
  }
};

export default selectedVacancies;
