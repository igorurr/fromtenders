import React from 'react'
import {connect} from "react-redux";

import errorImg from '../img/error.jpg'

const Error = ({ active }) => (
  <div className={'error-screen ' + (active ? '' : 'disabled')}>
    <img src={errorImg}/>
    <footer>Произошла ошибка<br/>Пожалуйста, обновите страницу</footer>
  </div>
);

const mapStateToProps = state => ({
  active: state.receivedData.fail
});

export default connect(
  mapStateToProps
)(Error);
