import React from 'react';

import { connect } from 'react-redux';
import { fetchData } from '../modules/actions/fetchData';
import { addIfNotExist, removeIfExist } from '../modules/actions/selectVacancy';

import { LeftBar } from './index'
import { ListVacancies } from '../components'


const mapStateToProps = state => ({
  isFetching: state.receivedData.isFetching,
  page: state.receivedData.loadedPage,
  items: state.receivedData.items,
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: page => dispatch(fetchData(page)),
  addIfNotExist: vac => dispatch(addIfNotExist(vac)),
  removeIfExist: vac => dispatch(removeIfExist(vac)),
});

const ConListVacancies = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListVacancies);


const Page1 = () => (
  <main id={"app"}>
    <LeftBar />
    <ConListVacancies />
  </main>
)

export default Page1
