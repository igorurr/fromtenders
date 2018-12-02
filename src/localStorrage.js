export const currentSelectedVacancies
  = typeof localStorage.selectedVacancies === 'string' ? JSON.parse(localStorage.selectedVacancies) : [];

export const updateCurrentSelectedVacancies  = ( newSelectedVacancies ) =>
  localStorage.setItem('selectedVacancies', JSON.stringify(newSelectedVacancies));