import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { typeInputSearch } from '../../actions/typeInputSearch';
import '../../css/Header.css';

const Header = ({ value, onSearch }) => {

  return(
    <div className='header'>

      <div className='links'>
        <Link to='/'>Список</Link>
        <Link to='/map'>Карта</Link>
      </div>

      <input
        type='text'
        placeholder='Искать по ключевым навыки'
        value={value}
        onChange={e => onSearch(e.target.value)}
      />

    </div>
  )
}

const mapStateToProps = state => ({
    value: state.inputSearch
});

const mapDispatchToProps = dispatch => ({
  onSearch: text => dispatch(typeInputSearch(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
