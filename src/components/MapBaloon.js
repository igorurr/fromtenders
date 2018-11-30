import React, {Component} from 'react'
import { Placemark } from 'react-yandex-maps';

class MapPlacemark extends Component {
  constructor(props) {
    super(props);

  }

  //sdfsdfsdf={console.log(this.props.item.id)}

  render() {
    console.log(this.props.item)
    return (
      <p>hui</p>
    );
  }
};

export default MapPlacemark;