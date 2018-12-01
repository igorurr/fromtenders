import React, { Component } from 'react'

import PlacemarkSingle from './PlacemarkSingle'
import { connect } from 'react-redux';

class PlacemarkGroup extends Component {

  getPositions(items) {
    let ret = [];
    items.forEach(item => {
      let position = [ item.address.lat, item.address.lng ];
      if (!ret.find(el => el[0] === position[0] && el[1] === position[1])) {
        ret.push(position)
      }
    });
    return ret;
  };

  render() {
    const { items } = this.props;
    return this.getPositions(items).map(address => (
      <PlacemarkSingle
        key={address}
        address={address}
      />
    ));
  }
};

const mapStateToProps = state => ({
  activeAddress: state.map.activeAddress,
}); /// ?????????????????????????????????????????

export default connect(
  mapStateToProps,
)(PlacemarkGroup);

// export default PlacemarkGroup;;
