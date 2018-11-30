import React, {Component} from 'react';

import { MapLeftBarVacancie } from './index'


class MapLeftBarVacancies extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if ( this.props.items.length <= 0 )
      return null;

    return (
      <aside className={"map-vacancies-address-container"}>
        {this.props.items.map((item)=>(
          <MapLeftBarVacancie item={item} key={item.id} />
        ))}
      </aside>
    ) ;
  }
};

export default MapLeftBarVacancies;