import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { connect } from 'react-redux';

import PlacemarkGroup from './PlacemarkGroup';
import VacancyBarHolder from './VacancyBarHolder';
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

  updateCurrentAddress(bounds) {
    let bottom_lat = bounds[0][0],
        left_lng = bounds[0][1],
        top_lat = bounds[1][0],
        right_lng = bounds[1][1];

    const origPath = 'https://api.hh.ru/vacancies?text=Frontend&area=1';
    const newPath = `${origPath}
      &top_lat=${top_lat}&bottom_lat=${bottom_lat}&left_lng=${left_lng}&right_lng=${right_lng}`;

    const lat = (bottom_lat + top_lat) / 2;
    const lng = (left_lng + right_lng) / 2;

    this.props.updateMapCenter([lat, lng]);
    this.props.fetchData(newPath);
  };

  initMapObject(Map) {
    if (Map == null)
      return;

    Map.events.add('actionend', e => {
      this.setState({ moved: false });

      let timeOut = setTimeout(() => {
        if (this.state.moved)
          return;

        this.updateCurrentAddress(Map.getBounds());
        this.setState({ lastTimeOut: null });
      }, 2000);

      if (this.state.lastTimeOut != null)
        clearInterval(this.state.lastTimeOut);

      this.setState({ lastTimeOut: timeOut });
    });

    Map.events.add('actionbegin', e => {
      this.setState({ moved: true });
    });

    Map.events.add('click', e => this.props.updateMapCenter([]));
  }

  render() {
    const items = this.cleareNullAddress(this.props.items)
    const itemsFromCurrentAddress =
      this.checkItemsForSelected(this.getItemsFromAddress(items, this.props.activeAddress));

    return (
      <content className="map-vacancies">
        <VacancyBarHolder items={itemsFromCurrentAddress} />
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
  activeAddress: state.mapCenter,
});

const mapDispatchToProps = dispatch => ({
  updateMapCenter: center => dispatch(updateMapCenter(center)),
  fetchData: path => dispatch(fetchData(path, 0))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapVacancies);
