import React from 'react'
import { Link } from 'react-router-dom';

const Navigate = () => (
    <ul>
      <li><Link to={"/"}>Список</Link></li>
      <li><Link to={"/map"}>Карта</Link></li>
    </ul>
)

export default Navigate;