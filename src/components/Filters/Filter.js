import React from 'react';

const Filter = ({ item, activeValue, updateFilter }) => (
  <div>
    {
      item.map(el => (
        <div
          key={el.text}
          className={activeValue === el.value ? 'filter active' : 'filter'}
          onClick={() => {
            activeValue === el.value
              ? updateFilter('')
              : updateFilter(el.value)}}
        >
          {el.text}
        </div>
      ))
    }
  </div>
)

export default Filter;
