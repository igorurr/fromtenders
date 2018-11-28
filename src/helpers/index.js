const tryRemoveFromArray = function( arr, elem )
{
  const pos = arr.indexOf(elem);
  if( pos == -1 )
    return;

  arr.splice(pos,1);
}

const tryPushToArray = function( arr, elem )
{
  const pos = arr.indexOf(elem);
  if( pos != -1 )
    return;

  arr.push(elem);
}

export { tryRemoveFromArray, tryPushToArray };