import React, {Component} from 'react'
import { Placemark } from 'react-yandex-maps';
import {connect} from "react-redux";

import {updateActive} from "../actions/map";
import {compare} from "../helpers";


class MapPlacemark extends Component {
  constructor(props) {
    super(props);

    this.state={
      active:this.isActiveAddress()
    };

    this.getrefs = this.getrefs.bind(this);
    this.update = this.update.bind(this);
  }

  isActiveAddress(){
    return compare(this.props.address,this.props.activeAddress);
  }

  update(e) {
    this.props.updateActive(
      this.isActiveAddress() ? [] : this.props.address
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
  activeAddress: state.map.activeAddress
});

const mapDispatchToProps = dispatch => ({
  updateActive: newAddress => dispatch(updateActive(newAddress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPlacemark);