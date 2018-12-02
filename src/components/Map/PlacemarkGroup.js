import React, { Component } from 'react'

import PlacemarkSingle from './PlacemarkSingle'
import { connect } from 'react-redux';

class PlacemarkGroup extends Component {

  getPositions(items) {
    let ret = [];
    items.forEach(item => {
      const position = [ item.address.lat, item.address.lng ];
      const findElem = ret.find(el => el.position[0] === position[0] && el.position[1] === position[1]);

      if ( findElem === undefined ) {
        ret.push({
          position,
          count: 0
        })
      }
      else
        findElem.count++;
    });
    return ret;
  };

  render() {
    const { items } = this.props;
    return this.getPositions(items).map(address => (
      <PlacemarkSingle
        key={address.position}
        address={address}
      />
    ));
  }
};

const mapStateToProps = state => ({
  activeAddress: state.map.activeAddress,
});

export default connect(
  mapStateToProps,
)(PlacemarkGroup);
