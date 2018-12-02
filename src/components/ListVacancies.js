import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';
import { listFetchData } from '../actions/list';
import getSearchedVacancies from '../selectors/getSearchedVacancies';


class RowComponent extends React.Component {
  render() {
    const { item, onAdd, onRemove } = this.props;
    return (
      <li>
        {item.name}
        <button onClick={onAdd}>Add</button>
        <button onClick={onRemove}>Remove</button>
      </li>
    )
  }
}

class ListVacancies extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  handleScroll() {
    const root = document.getElementById('root');
    const bottomScrollMark = 200;
    const currentBottomScroll = root.scrollHeight - root.scrollTop - root.clientHeight;

    if (this.props.isFetching || currentBottomScroll > bottomScrollMark) {
      return;
    }
    this.nextPage();
  }

  nextPage() {
    const { page, loadNextPage } = this.props;
    loadNextPage(page + 1);
  }

  render() {
    const { items, page, addIfNotExist, removeIfExist } = this.props;
    return (
      <div className="list-vacancies" onScroll={this.handleScroll}>
        {page}
        <button onClick={this.nextPage} type="button">Next</button>
        <ul>
          {items.map(
            item => (
              <RowComponent
                key={item.id}
                item={item}
                onAdd={() => addIfNotExist(item)}
                onRemove={() => removeIfExist(item)}/>
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
  page: state.list.page,
  items: getSearchedVacancies(state),
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: (page) => dispatch(listFetchData(page)),
  addIfNotExist: vac => dispatch(addIfNotExist(vac)),
  removeIfExist: vac => dispatch(removeIfExist(vac)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListVacancies);
