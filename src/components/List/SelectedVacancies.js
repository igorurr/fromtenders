import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { listFetchData } from '../../actions/list';
import getSearchedVacancies from '../../selectors/getSearchedVacancies';
import { checkItemsForSelected } from '../../helpers/';

import { SingleVacancy } from '../index';

class SelectedVacancies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedItems } = this.props;
    return (
      <ul className="list-vacancies" >
        {checkItemsForSelected(selectedItems,selectedItems).map(
          item => (
            <SingleVacancy
              key={item.id}
              item={item}
            />
          ))}
      </ul>
    );
  }
};


const mapStateToProps = state => ({
  selectedItems: state.selectedVacancies
});

export default connect(
  mapStateToProps
)(SelectedVacancies);
