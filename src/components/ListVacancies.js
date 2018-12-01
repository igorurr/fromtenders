import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addIfNotExist, removeIfExist } from '../actions/selectVacancy';
import { fetchData } from '../actions/fetchData';

class Vacancy extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div>
          <b>{item.name}</b>
          <div>
            Зарплата
            {item.salary === null || item.salary.from === null ? 
              ' обсуждается' : 
              <span>
                {' от'} {item.salary.from} {item.salary.to === null ? '' : <span> до {item.salary.to}</span>}
              </span>
            }
          </div>
          <div>
          {item.address === null ? '' : 
            <span>
            {item.address.city === null ? '' : <span> г. {item.address.city}</span>}
            </span>
          }
          </div>
    </div>
    );
  }
};

class RowComponent extends React.Component {
  render() {
    const { item, onAdd, onRemove } = this.props;
    return (
      <li>
        <Vacancy item={item} />
        <button onClick={onAdd}>Add</button>
        <button onClick={onRemove}>Remove</button>
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
    /*const bottomScrollMark = 200;
    const heightWithScroll = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const scrollHeight = heightWithScroll - document.documentElement.clientHeight;
    const scrollTop = window.pageYOffset - scrollHeight;

    if (this.props.isFetching || scrollTop < -200 ) {*/
    const scrollTest = document.getElementsByClassName('scrollTest')[0];
    const bottomScrollMark = 10;
    const currentBottomScroll = scrollTest.scrollHeight - scrollTest.scrollTop - scrollTest.clientHeight;

    if (this.props.isFetching || currentBottomScroll > bottomScrollMark) {
      return;
    }
    this.nextPage();
  }

  nextPage() {
    this.props.loadNextPage(this.props.page + 1);
  }

  render() {
    const { items, page, addIfNotExist, removeIfExist, selected } = this.props;
    //const { selected } = store.getState().selectedVacancies;
    return (
      <div>
        <div onScroll={this.handleScroll} className='scrollTest'>
          <ol>
            {items.map(
              item => (
                <RowComponent
                  key={item.id}
                  item={item}
                  onAdd={() => addIfNotExist(item)}
                  onRemove={() => removeIfExist(item)}/>
              ))}
          </ol>
        </div>
        <div className='scrollTest'>
          <ol>
            {selected.map(
              item => (
                <li key={item.id}>
                  <Vacancy item={item} />
                </li>
              ))}
          </ol>
        </div>
        <div>Страница {page + 1}</div>
        {//<button onClick={this.nextPage} type="button">Next</button>
        }
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
  page: state.receivedData.loadedPage,
  items: state.receivedData.items,
  selected: state.selectedVacancies.selected,
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
