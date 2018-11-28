import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';
import {fetchData} from "../actions/fetchData";


class RowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        {console.log(this.props.item)}
        {this.props.item.name} from {this.props.item.position} to {this.props.item.description}
        <button onClick={this.props.onAdd}>Add</button>
        <button onClick={this.props.onRemove}>Remove</button>
      </li>
    )
  }
}

class ListVacancies extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const root = document.getElementById('root');
    const bottomScrollMark = 200;
    const currentBottomScroll = root.scrollHeight - root.scrollTop - root.clientHeight;

    if (this.props.isFetching || currentBottomScroll > bottomScrollMark) {
      return;
    }
    this.props.loadNextPage(this.props.page + 1);
  }

  render() {
    return (
      <div onScroll={this.handleScroll}>
        <ul>
          {this.props.items.map(
            item => (
              <RowComponent key={item.id} item={item} onAdd={this.props.addIfNotExist} onRemove={this.props.removeIfExist}/>
            ))}
        </ul>
      </div>
    );
  }
};

ListVacancies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  addIfNotExist: PropTypes.func.isRequired,
  removeIfExist: PropTypes.func.isRequired,
};


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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListVacancies);
