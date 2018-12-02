import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';
import { listFetchData } from '../actions/list';

class Vacancy extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <article>
        <content>
          <a href={item.alternate_url} target="blank">{item.name}</a>
        </content>
          
        <footer>
          <p>{item.employer.name}</p>
        </footer>
    </article>
    );
  }
};

class RowComponent extends React.Component {
  onClickSelected = () => {
    const { item, onAdd, onRemove } = this.props;
    if (item.isSelected) {
      onRemove(item);
    } else {
      onAdd(item);
    }
  }

  render() {
    const { item, onAdd, onRemove } = this.props;
    return (
      <li className='list-vacancies'>
        <Vacancy item={item} onAdd={onAdd} />
        <a
          className={ item.isSelected ? 'selected' : ''}
          onClick={() => this.onClickSelected()}
        />
        <button onClick={() => onAdd(item)}>Add</button>
        <button onClick={() => onRemove(item)}>Remove</button>
    </li>
    );
  }
};

class ListVacancies extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  handleScroll() {
    const scrollTest = document.getElementsByClassName('scrollTest')[1];
    const bottomScrollMark = 10;
    const currentBottomScroll = scrollTest.scrollHeight - scrollTest.scrollTop - scrollTest.clientHeight;

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
    const { items, page, addIfNotExist, removeIfExist, selectedItems } = this.props;
    return (
      <div>
        <div className='scrollTest'>
          <ol>
            {selectedItems.map(
              item => (
                <li key={item.id}>
                  <Vacancy item={item} />
                </li>
              ))}
          </ol>
        </div>
        <div onScroll={this.handleScroll} className='scrollTest'>
          <ol>
            {items.map(
              item => (
                <RowComponent
                  key={item.id}
                  item={item}
                  onAdd={addIfNotExist}
                  onRemove={removeIfExist}/>
              ))}
          </ol>
        </div>
        <div>Страница {page + 1}</div>
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
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
  isFetching: state.receivedData.isFetching,
  page: state.list.page,
  items: state.receivedData.items,
  selectedItems: state.selectedVacancies,
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
