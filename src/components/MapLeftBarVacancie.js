import React, {Component} from 'react';
import {fetchData} from "../actions/fetchData";
import {addIfNotExist, removeIfExist} from "../actions/selectVacancy";
import {connect} from "react-redux";


class MapLeftBarVacancie extends Component {
  constructor(props) {
    super(props);

    this.onClickSelected = this.onClickSelected.bind(this);
  }

  onClickSelected() {
    if ( this.props.item.isSelected )
      this.props.removeIfExist( this.props.item );
    else
      this.props.addIfNotExist( this.props.item );
  }

  render() {
    const { item } = this.props;

    return (
      <article>
          <content>
            <a href={item.alternate_url} target={"blank"}> {item.name} </a>
          </content>
          <footer>
            <p>{item.employer.name}</p>
            <a
              className={(item.isSelected) ? 'selected' : ''}
              onClick={this.onClickSelected}
            />
          </footer>
      </article>
    );
  }
};

const mapStateToProps = state => ({
  selectedItems: state.selectedVacancies.selected
});

const mapDispatchToProps = dispatch => ({
  addIfNotExist: vac => dispatch(addIfNotExist(vac)),
  removeIfExist: vac => dispatch(removeIfExist(vac)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapLeftBarVacancie);