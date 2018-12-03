import React, { Component } from 'react';
import VacancyBar from '../SingleVacancy';


class VacancyBarHolder extends Component {
  render() {
    const { items } = this.props;
    if (items.length === 0)
      return null;

    return (
      <aside className='map-vacancies-address-container'>
        {
          items.map(item => (
            <VacancyBar item={item} key={item.id} />
          ))
        }
      </aside>
    );
  }
};

export default VacancyBarHolder;
