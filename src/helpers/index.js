const tryRemoveFromArray = function( arr, elem ) {
  const pos = arr.indexOf(elem);
  if( pos == -1 )
    return;

  arr.splice(pos, 1);
};

const tryPushToArray = function( arr, elem ) {
  const pos = arr.indexOf(elem);
  if( pos != -1 )
    return;

  arr.push(elem);
};

// for arrays
const compare = function( a1, a2 ) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i])
};

const vacancyRequestAdapter = data =>
  data.items.map(i => ({
    id: i.id,
    name: i.name,
    salary: i.salary,
    address: i.address,
    employer: i.employer,
    published_at: i.published_at,
    alternate_url: i.alternate_url,
  }));

const checkItemsForSelected = ( items, selectedItems ) => {
  let selectedItemsIds = selectedItems.map(el => el.id);
  return items.map(el => {
    el.isSelected = selectedItemsIds.indexOf( el.id ) !== -1;
    return el;
  });
};

export { tryRemoveFromArray, tryPushToArray, compare, vacancyRequestAdapter, checkItemsForSelected };
