import React from 'react'
import { Link } from 'react-router-dom';

import {} from './index'
import {} from '../components'

const LeftBar = () => (
  <aside>
    <h2>Список вакансий фронтендеров</h2>
    <ul>
      <li><Link to={"/"}>Список</Link></li>
      <li><Link to={"/map"}>Карта</Link></li>
    </ul>
  </aside>
)

export default LeftBar;