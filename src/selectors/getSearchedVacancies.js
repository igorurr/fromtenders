import { createSelector } from 'reselect';

const getSearchedVacancies = createSelector(
  (state) => state.receivedData.get('items'),
  (state) => state.inputSearch,
  (items, inputSearch) =>
    items.filter(i => i.name.toLowerCase().includes(inputSearch.toLowerCase()))
)

export default getSearchedVacancies;
