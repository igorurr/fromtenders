import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { connect } from 'react-redux';

import { MapPlacemarks, LeftBarVacancies } from '../index';
import { updateMapCenter } from '../../actions/updateMapCenter';
import { fetchData } from '../../actions/fetchData';


class MapVacancies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastTimeOut: null,
      moved: false
    };

    this.initMapObject = this.initMapObject.bind(this);
    this.checkItemsForSelected = this.checkItemsForSelected.bind(this);
    this.updateCurrentAddress = this.updateCurrentAddress.bind(this);
  }

  cleareNullAddress(items) {
    return items.filter(el => el.address !== null && el.address.lat !== null);
  };

  getItemsFromAddress(items, activeAddress) {
    return items.filter(
      el => el.address.lat === activeAddress[0] && el.address.lng === activeAddress[1]
    );
  };

  checkItemsForSelected(items) {
    let selectedItemsIds = this.props.selectedItems.map(el => el.id);
    return items.map(el => {
      el.isSelected = selectedItemsIds.indexOf( el.id ) !== -1;
      return el;
    });
  };

  updateCurrentAddress( bounds ) {
    // [bottom_lat, left_lng]
    // [top_lat, right_lng]
    console.log(bounds)

    let bottom_lat = bounds[0][0],
          left_lng = bounds[0][1],
          top_lat = bounds[1][0],
          right_lng = bounds[1][1]

    const path = 'https://api.hh.ru/vacancies?text=Frontend&area=1';
    const newPath = `${path}&top_lat=${top_lat}&bottom_lat=${bottom_lat}&left_lng=${left_lng}&right_lng=${right_lng}`;
    // this.props.updateMapCenter([]);
    // Надо, чтобы все в редаксе видно было. Не знаю, какие именно bounds сюда отправлять, но надо.
    this.props.takeCoor(newPath);
  };

  initMapObject(Map) {
    const { lastTimeOut, moved } = this.state;

    if (Map == null) return;

    Map.events.add('actionend', e => {
      this.setState({ moved: false });

      let timeOut = setTimeout(() => {
        if (!moved)
          this.updateCurrentAddress(Map.getBounds());
          this.setState({
            lastTimeOut: null
          });
      }, 2000);

      if( lastTimeOut !== null )
        clearInterval(lastTimeOut);

      this.setState({
        lastTimeOut: timeOut
      });
    });

    Map.events.add('actionbegin', e => {
      this.setState({ moved: true });
    });

    Map.events.add('click', e => this.props.updateMapCenter([]));
  }

  render() {
    const items = this.cleareNullAddress(this.props.items)
    const itemsFromCurrentAddres =
      this.checkItemsForSelected(this.getItemsFromAddress(items,this.props.activeAddress));

    return (
      <content className="map-vacancies">
        <LeftBarVacancies items={itemsFromCurrentAddres} />
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
  activeAddress: state.mapCenter.activeCenter,
});

const mapDispatchToProps = dispatch => ({
  updateMapCenter: newAddress => dispatch(updateMapCenter(newAddress)),
  takeCoor: path => dispatch(fetchData(path, 0))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapVacancies);
