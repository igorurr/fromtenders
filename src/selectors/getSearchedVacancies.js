import { createSelector } from 'reselect';

const getSearchedVacancies = createSelector(
  (state) => state.receivedData.items,
  (state) => state.inputSearch,
  (items, inputSearch) => items.filter(i => i.name.toLowerCase().includes(inputSearch))
)

export default getSearchedVacancies;
