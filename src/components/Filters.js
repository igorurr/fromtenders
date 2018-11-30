import React, {Component} from 'react';
import { connect } from 'react-redux';

import { FilterGroup } from './index';
import { fetchData } from '../actions/fetchData';
import {
  EXPERIENCE,
  EMPLOYMENT,
  SCHEDULE,
  SORT_TYPE,
  SALARY
} from '../constants/Filters';


class Filters extends Component {
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

  takeNewPath = (path, statePart) =>
    this.setState({
      [statePart]: path
    });

  render() {
    const { exp, empl, schedule, sortType, salary } = this.state;
    const { handleSubmit } = this.props;

    const origPath = 'https://api.hh.ru/vacancies?text=Frontend&area=1';
    const newPath = `${origPath}${exp}${empl}${schedule}${salary}${sortType}`;

    return (
      <div className='all-filter-groups'>

        <FilterGroup
          header={'Опыт работы'}
          parameter={EXPERIENCE}
          handleChange={path => this.takeNewPath(path, 'exp')}
        />

        <FilterGroup
          header={'Тип занятости'}
          parameter={EMPLOYMENT}
          handleChange={path => this.takeNewPath(path, 'empl')}
        />

        <FilterGroup
          header={'График работы'}
          parameter={SCHEDULE}
          handleChange={path => this.takeNewPath(path, 'schedule')}
        />

      <FilterGroup
        header={'Зарплата'}
        parameter={SALARY}
        handleChange={path => this.takeNewPath(path, 'salary')}
        />

        <FilterGroup
          header={'Сортировать по'}
          parameter={SORT_TYPE}
          handleChange={path => this.takeNewPath(path, 'sortType')}
        />

        <div>
          <button onClick={() => handleSubmit(newPath)}>
            Обновить
          </button>
        </div>

      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: newPath => dispatch(fetchData(newPath, 0))
});

export default connect(
  null,
  mapDispatchToProps,
)(Filters);
