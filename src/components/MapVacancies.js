import React, {Component} from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import {connect} from "react-redux";

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';
import { MapPlacemarks } from './index'


class MapVacancies extends Component {
  constructor(props) {
    super(props);

    this.initMapObject = this.initMapObject.bind(this);

  }

  initMapObject(Map){
    if(Map==null)
      return;

    const dfsdf = this;
    Map.events.add('actionend', function (e) {
      console.log(Map.getBounds());
    });
  }

  render() {
    return (
      <content className={"map-vacancies"}>
        <YMaps preload>
          <Map
            defaultState={{
              center: [55.76, 37.59],
              zoom: 11
            }}
            instanceRef={this.initMapObject}
            width={"100%"}
            height={"100%"}
          >
            <MapPlacemarks items={this.props.items} />
          </Map>
        </YMaps>
      </content>
    );
  }
};

const mapStateToProps = state => ({
  items: state.receivedData.items,
});

const mapDispatchToProps = dispatch => ({
  addIfNotExist: vac => dispatch(addIfNotExist(vac)),
  removeIfExist: vac => dispatch(removeIfExist(vac)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapVacancies);