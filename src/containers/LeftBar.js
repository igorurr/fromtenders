import React from 'react'

import { Navigate } from './index'
import { AllFilterGroups } from '../components'

const LeftBar = () => (
  <aside>
    <h2>Список вакансий фронтендеров</h2>
    <Navigate />
    <AllFilterGroups />
  </aside>
)

export default LeftBar;
