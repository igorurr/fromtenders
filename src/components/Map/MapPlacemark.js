import React, { Component } from 'react';
import { Placemark } from 'react-yandex-maps';
import { connect } from "react-redux";

import { updateMapCenter } from '../../actions/updateMapCenter';
import { compare } from '../../helpers';


class MapPlacemark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.isActiveAddress()
    };

    this.getrefs = this.getrefs.bind(this);
    this.update = this.update.bind(this);
  }

  isActiveAddress() {
    const { address, activeCenter } = this.props;
    return compare(address, activeCenter);
  }

  update(e) {
    const { address, updateMapCenter } = this.props;
    updateMapCenter (
      this.isActiveAddress() ? [] : address
    );
  }

  getrefs(Placemark){
    if(Placemark == null)
      return;

    Placemark.events.add('click', this.update);
  }

  /*
  properties={{
          iconContent: '5'
        }}
   */
  render() {
    return (
      <Placemark
        instanceRef={this.getrefs}
        defaultGeometry={this.props.address}
        options={{
          iconColor: this.isActiveAddress() ? '#ff6d43' : '#708eff'
        }}
      />
    );
  }
};


const mapStateToProps = state => ({
  activeCenter: state.mapCenter.activeCenter
});

const mapDispatchToProps = dispatch => ({
  updateMapCenter: center => dispatch(updateMapCenter(center)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPlacemark);
