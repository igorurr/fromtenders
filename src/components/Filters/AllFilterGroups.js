import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterGroup from './FilterGroup';
import { filterFetchData } from '../../actions/filters';
import {
  EXPERIENCE,
  EMPLOYMENT,
  SCHEDULE,
  SORT_TYPE,
  SALARY
} from '../../constants/AllFilterGroups';


class AllFilterGroups extends Component {
  constructor(props) {
    super(props);

    this.state = props.filters;
  }

  takeNewSearch = (search, statePart) =>
    this.setState({
      [statePart]: search
    });

  render() {
    const { exp, empl, schedule, salary, sortType } = this.state;
    const { filterFetchData } = this.props;

    return (
      <div className='all-filter-groups'>

        <FilterGroup
          activeValue={exp}
          header={'Опыт работы'}
          parameter={EXPERIENCE}
          handleChange={search => this.takeNewSearch(search, 'exp')}
        />

        <FilterGroup
          activeValue={empl}
          header={'Тип занятости'}
          parameter={EMPLOYMENT}
          handleChange={search => this.takeNewSearch(search, 'empl')}
        />

        <FilterGroup
          activeValue={schedule}
          header={'График работы'}
          parameter={SCHEDULE}
          handleChange={search => this.takeNewSearch(search, 'schedule')}
        />

        <FilterGroup
          activeValue={salary}
          header={'Зарплата'}
          parameter={SALARY}
          handleChange={search => this.takeNewSearch(search, 'salary')}
        />

        <FilterGroup
          activeValue={sortType}
          header={'Сортировать по'}
          parameter={SORT_TYPE}
          handleChange={search => this.takeNewSearch(search, 'sortType')}
        />

        <div>
          <button onClick={ () => filterFetchData(this.state) }>
            Обновить
          </button>
        </div>

      </div>
    );
  }
};

const mapStateToProps = state => ({
  filters: state.filters.state
});

const mapDispatchToProps = dispatch => ({
  filterFetchData: newFilters => dispatch(filterFetchData(newFilters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllFilterGroups);
