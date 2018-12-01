import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterGroup from './FilterGroup';
import { fetchData } from '../../actions/fetchData';
import {
  EXPERIENCE,
  EMPLOYMENT,
  SCHEDULE,
  SORT_TYPE,
  SALARY
} from './consts';


class AllFilterGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exp: '',
      empl: '',
      schedule: '',
      salary: '',
      sortType: '',
    };
  }

  takeNewSearch = (search, statePart) =>
    this.setState({
      [statePart]: search
    });

  render() {
    const { exp, empl, schedule, sortType, salary } = this.state;
    const { handleSubmit } = this.props;

    const origSearch = 'https://api.hh.ru/vacancies?text=Frontend&area=1';
    const newSearch = `${origSearch}${exp}${empl}${schedule}${salary}${sortType}`;

    return (
      <div className='all-filter-groups'>

        <FilterGroup
          header={'Опыт работы'}
          parameter={EXPERIENCE}
          handleChange={search => this.takeNewSearch(search, 'exp')}
        />

        <FilterGroup
          header={'Тип занятости'}
          parameter={EMPLOYMENT}
          handleChange={search => this.takeNewSearch(search, 'empl')}
        />

        <FilterGroup
          header={'График работы'}
          parameter={SCHEDULE}
          handleChange={search => this.takeNewSearch(search, 'schedule')}
        />

        <FilterGroup
          header={'Зарплата'}
          parameter={SALARY}
          handleChange={search => this.takeNewSearch(search, 'salary')}
        />

        <FilterGroup
          header={'Сортировать по'}
          parameter={SORT_TYPE}
          handleChange={search => this.takeNewSearch(search, 'sortType')}
        />

        <div>
          <button onClick={() => handleSubmit(newSearch)}>
            Обновить
          </button>
        </div>

      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: newSearch => dispatch(fetchData(newSearch, 0))
});

export default connect(
  null,
  mapDispatchToProps,
)(AllFilterGroups);
