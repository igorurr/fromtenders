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
    return compare(address, activeAddress);
  }

  update(e) {
    const { address, updateMapPosition } = this.props;
    updateMapPosition (
      this.isActiveAddress() ? [] : address
    );
  }

  getRefs(Placemark){
    if (Placemark !== null) {
      Placemark.events.add('click', this.update);
    }
  }

  render() {
    return (
      <Placemark
        instanceRef={this.getRefs}
        defaultGeometry={this.props.address}
        options={{
          iconColor: this.isActiveAddress() ? '#ff6d43' : '#708eff'
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
