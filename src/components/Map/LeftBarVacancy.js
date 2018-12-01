import React, { Component } from 'react';
import { addIfNotExist, removeIfExist } from '../../actions/selectVacancy';
import { connect } from 'react-redux';


class LeftBarVacancy extends Component {

  onClickSelected = () => {
    const { item, addIfNotExist, removeIfExist } = this.props;
    if (item.isSelected)
      removeIfExist(item);
    else
      addIfNotExist(item);
  }

  render() {
    const { item } = this.props;

    return (
      <article>
          <content>
            <a href={item.alternate_url} target="blank">{item.name}</a>
          </content>

          <footer>
            <p>{item.employer.name}</p>
            <a
              className={item.isSelected ? 'selected' : ''}
              onClick={() => this.onClickSelected()}
            />
          </footer>

      </article>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  addIfNotExist: vac => dispatch(addIfNotExist(vac)),
  removeIfExist: vac => dispatch(removeIfExist(vac)),
});

export default connect(
  null,
  mapDispatchToProps,
)(LeftBarVacancy);
