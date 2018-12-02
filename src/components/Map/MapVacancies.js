import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { connect } from 'react-redux';

import PlacemarkGroup from './PlacemarkGroup';
import VacancyBarHolder from './VacancyBarHolder';
import { updateMapSelectedAddress, mapFetchData } from '../../actions/map';


class MapVacancies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastTimeOut: null,
      moved: false
    };

    this.initMapObject = this.initMapObject.bind(this);
    this.waitForUpdateCurrentAddress = this.waitForUpdateCurrentAddress.bind(this);
    this.checkItemsForSelected = this.checkItemsForSelected.bind(this);
    this.updateCurrentAddress = this.updateCurrentAddress.bind(this);
  }

  //#region helpers

  cleareNullAddress(items) {
    return items.filter(el => el.address !== null && el.address.lat !== null);
  };

  getItemsFromAddress(items, activeAddress) {
    return items.filter(el =>
      el.address.lat === activeAddress[0] && el.address.lng === activeAddress[1]
    );
  };

  checkItemsForSelected(items) {
    let selectedItemsIds = this.props.selectedItems.map(el => el.id);
    return items.map(el => {
      el.isSelected = selectedItemsIds.indexOf( el.id ) !== -1;
      return el;
    });
  };

  //#endregion

  //#region events

  initMapObject(Map) {
    if (Map == null)
      return;

    Map.events.add('actionend', e => {
      this.waitForUpdateCurrentAddress( Map )
    });

    Map.events.add('actionbegin', e => this.setState({ moved: true }) );

    Map.events.add('click', e => this.props.updateMapSelectedAddress([]));
  }

  //#endregion

  //#region service methods

  waitForUpdateCurrentAddress(Map) {
    this.setState({ moved: false });

    let timeOut = setTimeout(() => {
      if (this.state.moved)
        return;

      this.updateCurrentAddress(Map);
      this.setState({ lastTimeOut: null });
    }, 500);

    if (this.state.lastTimeOut != null)
      clearInterval(this.state.lastTimeOut);

    this.setState({ lastTimeOut: timeOut });
  }

  updateCurrentAddress(Map) {
    const bounds = Map.getBounds(),
          center = Map.getCenter(),
          zoom = Map.getZoom();

    const bottom_lat = bounds[0][0],
        left_lng = bounds[0][1],
        top_lat = bounds[1][0],
        right_lng = bounds[1][1];

    this.props.mapFetchData({
      bounds:{
        bottom_lat,
        left_lng,
        top_lat,
        right_lng
      },
      center,
      zoom
    });
  };

  //#endregion

  render() {
    const items = this.cleareNullAddress(this.props.items);
    const itemsFromCurrentAddress =
      this.checkItemsForSelected(this.getItemsFromAddress(items, this.props.activeAddress));

    const { center, zoom } = this.props.visibleData;

    return (
      <content className="map-vacancies">
        <VacancyBarHolder items={itemsFromCurrentAddress} />
        <YMaps preload>
          <Map
            defaultState={{
              center,
              zoom
            }}
            instanceRef={this.initMapObject}
            width={"100%"}
            height={"100%"}
          >
            <PlacemarkGroup items={items} />
          </Map>
        </YMaps>
      </content>
    );
  }
};


const mapStateToProps = state => ({
  items: state.receivedData.items,
  selectedItems: state.selectedVacancies,
  activeAddress: state.map.activeAddress,
  visibleData: state.map.visibleData
});

const mapDispatchToProps = dispatch => ({
  updateMapSelectedAddress: newAddress => dispatch(updateMapSelectedAddress(newAddress)),
  mapFetchData: newVisibleData => dispatch(mapFetchData(newVisibleData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapVacancies);
