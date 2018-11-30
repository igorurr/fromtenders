import React, {Component} from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import {connect} from "react-redux";

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';
import { MapPlacemarks } from './index'
import {updateActive} from "../actions/map";


class MapVacancies extends Component {
  constructor(props) {
    super(props);

    this.initMapObject = this.initMapObject.bind(this);
    this.initYMapObject = this.initYMapObject.bind(this);
    this.updateCurrentAddress = this.updateCurrentAddress.bind(this);
  }

  cleareNullAddress(items) {
    return items.filter((el) => el.address != null && el.address.lat != null);
  };

  getItemsFromAddress(items,activeAddress) {
    return items.filter((el) => el.address.lat == activeAddress[0] && el.address.lng == activeAddress[1]);
  };

  updateCurrentAddress( bounds ) {
    console.log(bounds);
  };

  initYMapObject(YMap){
    console.log(YMap)
  }

  initMapObject(Map){
    if(Map==null)
      return;

    Map.events.add('actionend', (e)=>{
      this.updateCurrentAddress(Map.getBounds());
    });
    Map.events.add('click', (e)=>this.props.updateActive([]));
  }

  render() {
    const items = this.cleareNullAddress(this.props.items)
    const itemsFromCurrentAddres = this.getItemsFromAddress(items,this.props.activeAddress);

    return (
      <content className={"map-vacancies"}>
        <aside className={"map-vacancies-address-container " + ((itemsFromCurrentAddres.length<=0)?"disabled":"")}>
          {itemsFromCurrentAddres.map((el)=>(
            <article dsf={console.log(el)} key={el.id}>
              <a href={el.alternate_url}>
                <content>
                  {el.name}
                </content>
                <footer>
                  {el.employer.name}
                </footer>
              </a>
            </article>
          ))}
        </aside>
        <YMaps preload onAPIAvailable={function () { console.log('API loaded'); }} >
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
  activeAddress: state.map.activeAddress
});

const mapDispatchToProps = dispatch => ({
  updateActive: newAddress => dispatch(updateActive(newAddress)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapVacancies);