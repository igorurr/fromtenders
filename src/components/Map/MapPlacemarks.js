import React, { Component } from 'react'

import { MapPlacemark } from '../index'
import { connect } from 'react-redux';

class MapPlacemarks extends Component {

  getPositions(items) {
    let ret = [];
    items.forEach((item, i, arr) => {
      let position = [ item.address.lat, item.address.lng ];
      if( !ret.find((el) => el[0] === position[0] && el[1] === position[1]) )
        ret.push(position)
    });
    return ret;
  };

  render() {
    return this.getPositions(this.props.items).map((address, i) => (
      <MapPlacemark
        key={address}
        address={address}
      />
    ));
  }
};

const mapStateToProps = state => ({
  activeAddress: state.mapCenter.activeCenter,
}); /// ?????????????????????????????????????????

export default connect(
  mapStateToProps,
)(MapPlacemarks);
