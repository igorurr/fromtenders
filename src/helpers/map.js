const cleareNullAddress = function(items) {
  return items.filter((el) => el.address != null && el.address.lat != null);
};

const latLngToString = function( lat, lng ) {
  return lat + ' ' + lng;
};

const mapObj = function( obj, action ) {
  let ret = [];
  for( let elem in obj )
    ret.push(action( obj[elem], elem ));
  return ret;
};

export { cleareNullAddress, latLngToString, mapObj };