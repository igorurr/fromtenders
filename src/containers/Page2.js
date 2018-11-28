import React from 'react';

import { connect } from 'react-redux';
import { addIfNotExist, removeIfExist } from '../modules/actions/selectVacancy';

import { LeftBar } from './index';
import { MapVacancies } from '../components'


const mapStateToProps = state => ({
  items: state.receivedData.items,
});

const mapDispatchToProps = dispatch => ({
  addIfNotExist: vac => dispatch(addIfNotExist(vac)),
  removeIfExist: vac => dispatch(removeIfExist(vac)),
});

const ConMapVacancies = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapVacancies);

const Page2 = () => (
  <main id={"app"} style={{ height: window.innerHeight+"px" }}>
    <LeftBar />
    <ConMapVacancies />
  </main>
)

export default Page2
