import React, { Component } from 'react';
import { LeftBarVacancy } from '../index'


class LeftBarVacancies extends Component {
  render() {
    const { items } = this.props;
    if (items.length <= 0 )
      return null;

    return (
      <aside className="map-vacancies-address-container">
        {
          items.map(item => (
            <LeftBarVacancy item={item} key={item.id} />
          ))
        }
      </aside>
    ) ;
  }
};

export default LeftBarVacancies;
