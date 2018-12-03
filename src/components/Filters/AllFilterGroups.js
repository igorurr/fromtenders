import React from 'react';
import { connect } from 'react-redux';

import FilterGroup from './FilterGroup';
import { filterFetchData } from '../../actions/updateFilter';
import {
  EXPERIENCE,
  EMPLOYMENT,
  SCHEDULE,
  SORT_TYPE,
  SALARY
} from '../../constants/allFilterGroups';

const AllFilterGroups = ({ filterFetchData }) => {

    return (
      <div className='all-filter-groups'>

        <FilterGroup
          activeValue={'exp'}
          header={'Опыт работы'}
          parameter={EXPERIENCE}
          onFilterClick={value => filterFetchData('exp', value)}
        />

        <FilterGroup
          activeValue={'empl'}
          header={'Тип занятости'}
          parameter={EMPLOYMENT}
          onFilterClick={value => filterFetchData('empl', value)}
        />

        <FilterGroup
          activeValue={'schedule'}
          header={'График работы'}
          parameter={SCHEDULE}
          onFilterClick={value => filterFetchData('schedule', value)}
        />

        <FilterGroup
          activeValue={'salary'}
          header={'Зарплата'}
          parameter={SALARY}
          onFilterClick={value => filterFetchData('salary', value)}
        />

        <FilterGroup
          activeValue={'sortType'}
          header={'Сортировать по'}
          parameter={SORT_TYPE}
          onFilterClick={value => filterFetchData('sortType', value)}
        />

      </div>
    );
};

const mapDispatchToProps = dispatch => ({
  filterFetchData: (filter, value) => dispatch(filterFetchData(filter, value))
});

export default connect(
  null,
  mapDispatchToProps,
)(AllFilterGroups);
