import React from 'react'

import { Navigate } from './index'
import { Filters } from '../components'

const LeftBar = () => (
  <aside>
    <h2>Список вакансий фронтендеров</h2>
    <Navigate />
    <Filters />
  </aside>
)

export default LeftBar;