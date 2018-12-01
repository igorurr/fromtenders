import React, { Component } from 'react';
import { Placemark } from 'react-yandex-maps';
import { connect } from 'react-redux';

import { updateMapSelectedAddress } from '../../actions/map';
import { compare } from '../../helpers';


class PlacemarkSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.isActiveCenter()
    };

    this.getRefs = this.getRefs.bind(this);
    this.update = this.update.bind(this);
  }

  isActiveCenter() {
    const { address, activeCenter } = this.props;
    return compare(address, activeCenter);
  }

  update(e) {
    const { address, updateMapPosition } = this.props;
    updateMapPosition (
      this.isActiveCenter() ? [] : address
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
          iconColor: this.isActiveCenter() ? '#ff6d43' : '#708eff'
        }}
      />
    );
  }
};

/// +++ this.prop.address
const mapStateToProps = state => ({
  activeCenter: state.map
});

const mapDispatchToProps = dispatch => ({
  updateMapPosition: center => dispatch(updateMapSelectedAddress(center)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacemarkSingle);
