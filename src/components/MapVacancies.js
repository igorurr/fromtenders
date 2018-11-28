import React, {Component} from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import {connect} from "react-redux";

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';


class MapVacancies extends Component {
  constructor(props) {
    super(props);

    console.log(this);
  }

  render() {
    const items = this.props.items.filter((el)=>el.address!=null);

    return (
      <content className={"map-vacancies"}>
        <YMaps>
          <Map
            defaultState={{
              center: [55.75, 37.57],
              zoom: 9
            }}
            width={"100%"}
            height={"100%"}
          >
            {items.map((el,i,o)=>(
                <Placemark
                  key={el.id}
                  modules={['geoObject.addon.balloon']}
                  defaultGeometry={[el.address.lat, el.address.lng]}
                  properties={{
                    balloonContentHeader : el.name,
                    balloonContentBody :
                    '<div class="baloon-body">' +
                    '<p>Описание:' +el.description+ '</p>' +
                    '<p>Описание:' +el.description+ '</p>' +
                    '</div>'
                  }}
                />
              )
            )}
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