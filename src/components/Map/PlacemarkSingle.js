import React, { Component } from 'react';
import { Placemark } from 'react-yandex-maps';
import { connect } from 'react-redux';

import { updateMapSelectedAddress } from '../../actions/map';
import { compare } from '../../helpers';


class PlacemarkSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.isActiveAddress()
    };

    this.getRefs = this.getRefs.bind(this);
    this.update = this.update.bind(this);
  }

  isActiveAddress() {
    const { address, activeAddress } = this.props;
    return compare(address.position, activeAddress);
  }

  update(e) {
    const { address, updateMapPosition } = this.props;
    updateMapPosition (
      this.isActiveAddress() ? [] : address.position
    );
  }

  getRefs(Placemark){
    if (Placemark !== null) {
      Placemark.events.add('click', this.update);
    }
  }

  render() {
    const { position, count } = this.props.address;
    return (
      <Placemark
        instanceRef={this.getRefs}
        defaultGeometry={position}
        options={{
          iconColor: this.isActiveAddress() ? '#ff6d43' : '#708eff'
        }}
        properties={{
          iconContent: count+1
        }}
      />
    );
  }
};

/// +++ this.prop.address
const mapStateToProps = state => ({
  activeAddress: state.map.activeAddress
});

const mapDispatchToProps = dispatch => ({
  updateMapPosition: newAddress => dispatch(updateMapSelectedAddress(newAddress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacemarkSingle);
