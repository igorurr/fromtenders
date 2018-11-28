import React, {Component} from 'react';

import {CheckBoxes,RadioBtns,TextField} from './index'
import * as consts from '../constants/Filters'

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <ul className={"filters"}>
        <li>
          <header>Поиск:</header>
          <content>
            <TextField onChange={(msg)=>console.log(msg)} />
          </content>
        </li>
        <li className={"form-diappason"}>
          <header>Заработная плата:</header>
          <content>
            <TextField type={"number"} onChange={(msg)=>console.log(msg)} placeholder={'От'} />
            -
            <TextField type={"number"} onChange={(msg)=>console.log(msg)} placeholder={'До'} />
            ₽
          </content>
        </li>
        <li>
          <header>Опыт работы:</header>
          <RadioBtns data={consts.EXPERIENCE_SELECTOR} default={'0'} onChange={(msg)=>console.log(msg)} />
        </li>
        <li>
          <header>Тип занятости:</header>
          <CheckBoxes data={consts.EMPLOYMENT_SELECTOR} default={['0']} onChange={(msg)=>console.log(msg)} />
        </li>
        <li>
          <header>График работы:</header>
          <content>
            <CheckBoxes data={consts.SCHEDULE_SELECTOR} default={['0']} onChange={(msg)=>console.log(msg)} />
          </content>
        </li>
        <li>
          <header>Сортировать по:</header>
          <RadioBtns data={consts.SORT_TYPE_SELECTOR} default={'1'} onChange={(msg)=>console.log(msg)} />
        </li>
        <li>
          <header>Город:</header>
          <RadioBtns data={consts.SITY_SELECTOR} default={'0'} onChange={(msg)=>console.log(msg)} />
        </li>
        <li>
          <header>Выводить за:</header>
          <RadioBtns data={consts.DISPLAY_BY_SELECTOR} default={'0'} onChange={(msg)=>console.log(msg)} />
        </li>
        <li>
          <button>Обновить</button>
        </li>
      </ul>
    );
  }
};

export default Filters;