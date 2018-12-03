import React, { Component } from 'react';
import VacancyBar from './VacancyBar';


class VacancyBarHolder extends Component {
  render() {
    console.log(this.props.items)
    const { items } = this.props;
    if (items.length === 0)
      return null;
    console.log(this.props.items)

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
