import React, {Component} from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import {connect} from "react-redux";

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';
import { MapPlacemarks, MapLeftBarVacancies } from './index'
import {updateActive} from "../actions/map";


class MapVacancies extends Component {
  constructor(props) {
    super(props);

    this.state={
      lastTimeOut: null,
      moved: false
    };

    this.initMapObject = this.initMapObject.bind(this);
    this.checkItemsForSelected = this.checkItemsForSelected.bind(this);
    this.updateCurrentAddress = this.updateCurrentAddress.bind(this);
  }

  cleareNullAddress(items) {
    return items.filter((el) => el.address != null && el.address.lat != null);
  };

  getItemsFromAddress(items,activeAddress) {
    return items.filter((el) => el.address.lat == activeAddress[0] && el.address.lng == activeAddress[1]);
  };

  checkItemsForSelected(items) {
    let selectedItemsIds = this.props.selectedItems.map((el)=>el.id);
    return items.map((el) => {
      el.isSelected = selectedItemsIds.indexOf( el.id ) != -1;
      return el;
    });
  };

  updateCurrentAddress( bounds ) {
    // [bottom_lat, left_lng]
    // [top_lat, right_lng]
    console.log(bounds)
  };

  initMapObject(Map){
    if(Map==null)
      return;

    Map.events.add('actionend', (e)=>{
      this.setState({ moved: false });

      let lastTimeOut = setTimeout(() => {
        if (!this.state.moved)
          this.updateCurrentAddress(Map.getBounds());
          this.setState({
            lastTimeOut: null
          });
      }, 2000);

      if( this.state.lastTimeOut != null )
        clearInterval(this.state.lastTimeOut);

      this.setState({
        lastTimeOut: lastTimeOut
      });
    });
    Map.events.add('actionbegin', (e)=>{
      this.setState({ moved: true });
    });
    Map.events.add('click', (e)=>this.props.updateActive([]));
  }

  render() {
    const items = this.cleareNullAddress(this.props.items)
    const itemsFromCurrentAddres = this.checkItemsForSelected(this.getItemsFromAddress(items,this.props.activeAddress));
    return (
      <content className={"map-vacancies"}>
        <MapLeftBarVacancies items={itemsFromCurrentAddres} />
        <YMaps preload >
          <Map
            defaultState={{
              center: [55.76, 37.59],
              zoom: 11
            }}
            instanceRef={this.initMapObject}
            width={"100%"}
            height={"100%"}
          >
            <MapPlacemarks items={items} />
          </Map>
        </YMaps>
      </content>
    );
  }
};

const mapStateToProps = state => ({
  items: state.receivedData.items,
  selectedItems: state.selectedVacancies.selected,
  activeAddress: state.map.activeAddress
});

const mapDispatchToProps = dispatch => ({
  updateActive: newAddress => dispatch(updateActive(newAddress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapVacancies);