import React, { Component } from 'react';
import { Placemark } from 'react-yandex-maps';
import { connect } from 'react-redux';

import { updateMapCenter } from '../../actions/updateMapCenter';
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
    const { address, updateMapCenter } = this.props;
    updateMapCenter (
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
  activeCenter: state.mapCenter
});

const mapDispatchToProps = dispatch => ({
  updateMapCenter: center => dispatch(updateMapCenter(center)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacemarkSingle);
