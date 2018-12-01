import React, {Component} from 'react';
import { connect } from 'react-redux';

import OneFilterGroup from './OneFilterGroup';
import { fetchData } from '../../actions/fetchData';
import {
  EXPERIENCE,
  EMPLOYMENT,
  SCHEDULE,
  SORT_TYPE,
  SALARY
} from './constants';


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

        <OneFilterGroup
          header={'Опыт работы'}
          parameter={EXPERIENCE}
          handleChange={path => this.takeNewPath(path, 'exp')}
        />

        <OneFilterGroup
          header={'Тип занятости'}
          parameter={EMPLOYMENT}
          handleChange={path => this.takeNewPath(path, 'empl')}
        />

        <OneFilterGroup
          header={'График работы'}
          parameter={SCHEDULE}
          handleChange={path => this.takeNewPath(path, 'schedule')}
        />

        <OneFilterGroup
          header={'Зарплата'}
          parameter={SALARY}
          handleChange={path => this.takeNewPath(path, 'salary')}
        />

        <OneFilterGroup
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
)(AllFilterGroups);
