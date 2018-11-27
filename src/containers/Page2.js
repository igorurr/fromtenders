import React from 'react'

import {LeftBar} from './index'
import {MapVacancies} from '../components'

const Page2 = () => (
  <main id={"app"} style={{ height: window.innerHeight+"px" }}>
    <LeftBar />
    <MapVacancies />
  </main>
)

export default Page2;