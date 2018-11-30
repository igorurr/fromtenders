import React, {Component} from 'react'

import { MapPlacemark } from './index'

import { cleareNullAddress, mapObj, latLngToString } from '../helpers/map'

class MapPlacemarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: cleareNullAddress(props.items)
    };

    this.itemsPreprocess = this.itemsPreprocess.bind(this);
    this.fsdfsdfsdf = this.itemsPreprocess([],cleareNullAddress(props.items));

    let hhh = ()=>{
      this.setState((oldState)=> ({
        items: oldState.items.concat(oldState.items)
      }));
      this.fsdfsdfsdf = this.itemsPreprocess( this.fsdfsdfsdf, this.state.items );
    };
    hhh = hhh.bind(this);
    //setTimeout(hhh,3000);
    //setTimeout(hhh,4000);
  }

  itemsPreprocess ( items, newItems ){
    let ret = Object.assign({}, items);
    newItems.forEach((newItem,i,arr)=>{
      const coordStr = latLngToString( newItem.address.lat, newItem.address.lng );
      if( coordStr in ret )
      {
        ret[coordStr].push(newItem);
      }
      else
      {
        ret[coordStr] = [newItem];
      }
    });
    return ret;
  };

  render() {
    return mapObj(this.fsdfsdfsdf, (el,key)=>(
      <MapPlacemark
        key={key}
        items={el}
      />
    ));
  }
};

export default MapPlacemarks;