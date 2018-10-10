import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import navLinks from '../navLinks';
import './HeaderMobileDropdown.scss';

const HeaderMobileDropdown = props => {
  const { isActive, clickCallback } = props;

  return (
    <div className={`header__mobile-dropdown ${isActive ? 'active' : ''}`}>
      <ul>
        {navLinks.map(link => <li key={link.label}>
          <NavLink exact activeClassName='selected'
            to={link.url} onClick={clickCallback}>{link.label}
            <RightArrowIcon
              className='header__mobile-dropdown__icon'
            />
          </NavLink></li>
        )}
        <li>
          <NavLink to='settings' onClick={clickCallback}>
                        Settings
            <RightArrowIcon
              className='header__mobile-dropdown__icon'
            />
          </NavLink>
        </li>
        <li>
          <Link to='/logout'>
              Logout
            <RightArrowIcon
              className='header__mobile-dropdown__icon'
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

HeaderMobileDropdown.propTypes = {
  isActive: PropTypes.bool,
  clickCallback: PropTypes.func.isRequired
};

export default HeaderMobileDropdown;
