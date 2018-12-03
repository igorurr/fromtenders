import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { listFetchData } from '../../actions/list';
import getSearchedVacancies from '../../selectors/getSearchedVacancies';
import { checkItemsForSelected } from '../../helpers/';

import { SingleVacancy } from '../index';

class ListVacancies extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.checkOffset = this.checkOffset.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  handleScroll() {
    this.checkOffset();
  }

  checkOffset() {
    const bottomScrollMark = 200;

    const dlv = this.domListVacancies;

    const track = dlv.scrollHeight - bottomScrollMark < dlv.scrollTop + dlv.clientHeight;

    if (this.props.isFetching || dlv.scrollHeight - bottomScrollMark > dlv.scrollTop + dlv.clientHeight ) {
      return;
    }

    console.log( track )
    this.nextPage();
  }

  nextPage() {
    const { page, loadNextPage } = this.props;
    loadNextPage(page + 1);
  }

  render() {
    const { items, page, addIfNotExist, removeIfExist, selectedItems } = this.props;
    return (
      <ul
        ref={(el)=>this.domListVacancies = ReactDOM.findDOMNode(el)}
        className="list-vacancies"
        onScroll={this.handleScroll}
      >
        {checkItemsForSelected(items,selectedItems).map(
          item => (
            <SingleVacancy
              key={item.id}
              item={item}
            />
          ))}
      </ul>
    );
  }

  componentDidUpdate() {
    this.checkOffset();
  }
};


const mapStateToProps = state => ({
  isFetching: state.receivedData.get('isFetching'),
  selectedItems: state.selectedVacancies,
  page: state.loadedPages,
  items: getSearchedVacancies(state),
});

const mapDispatchToProps = dispatch => ({
  loadNextPage: (page) => dispatch(listFetchData(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListVacancies);
