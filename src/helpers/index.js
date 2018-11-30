const tryRemoveFromArray = function( arr, elem )
{
  const pos = arr.indexOf(elem);
  if( pos == -1 )
    return;

  arr.splice(pos,1);
};

const tryPushToArray = function( arr, elem )
{
  const pos = arr.indexOf(elem);
  if( pos != -1 )
    return;

  arr.push(elem);
};

// for arrays
const compare = function( a1, a2 ) {
  return a1.length == a2.length && a1.every((v,i)=>v === a2[i])
}

export { tryRemoveFromArray, tryPushToArray, compare };