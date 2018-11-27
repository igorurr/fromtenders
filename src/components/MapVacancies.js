import React, {Component} from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

class MapVacancies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          name: 'name1',
          company: 'company1',
          position: [55.75, 37.57],
          description: 'dfdfgfdfgdfgfg',
          remote: true
        },
        {
          name: 'name2',
          company: 'company2',
          position: [55.75, 37.87],
          description: 'dfdfgfdfgdfgfg',
          remote: false
        },
        {
          name: 'name3',
          company: 'company3',
          position: [56.25, 37.57],
          description: 'dfdfgfdfgdfgfg',
          remote: true
        },
        {
          name: 'name4',
          company: 'company3',
          position: [56.25, 37.57],
          description: 'dfdfgfdfgdfgfg',
          remote: true
        }
      ]
    };
  }

  render() {
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
            {this.state.list.map((el,i,o)=>{
              return (
                <Placemark
                  modules={['geoObject.addon.balloon']}
                  defaultGeometry={el.position}
                  properties={{
                    balloonContentHeader : el.name,
                    balloonContentBody :
                    '<div class="baloon-body">' +
                    '<p>Описание:' +el.description+ '</p>' +
                    '<p>Описание:' +el.description+ '</p>' +
                    '</div>'
                  }}
                />
              );
            })}
          </Map>
        </YMaps>
      </content>
    );
  }
};

export default MapVacancies;