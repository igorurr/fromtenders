import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { typeInputSearch } from '../../actions/typeInputSearch';
import '../../css/Header.css';

const Header = ({ value, router, onSearch }) => {

  return(
    <div className='header-line'>

      <div className='app-title'>
        Вакансии для Frontend-разработчика в Москве
      </div>

      <div className='links'>
        <Link
          to='/selected'
          className={router === '/selected' ? 'route' : ''}
        >
          Избранное
        </Link>
        <Link
          to='/'
          className={router === '/' ? 'route' : ''}
        >
          Список
        </Link>
        <Link
          to='/map'
          className={router === '/map' ? 'route' : ''}
        >
          Карта
        </Link>
      </div>

      <div className="search">
        Искать:
        <input
          type='text'
          placeholder='Искать по названию'
          value={value}
          onChange={e => onSearch(e.target.value)}
        />
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  value: state.inputSearch,
  router: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  onSearch: text => dispatch(typeInputSearch(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
