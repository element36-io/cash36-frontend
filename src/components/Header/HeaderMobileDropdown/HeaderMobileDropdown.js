import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import UserProfile from '../../UserProfile';
import navLinks from '../navLinks';
import './HeaderMobileDropdown.scss';

const HeaderMobileDropdown = ({ isActive, logout, clickCallback }) => (
  <div className={`header__mobile-dropdown ${isActive ? 'active' : ''}`}>
    <UserProfile alt />
    <ul className="paper">
      {navLinks.map(link => (
        <li key={link.label}>
          <NavLink
            exact
            activeClassName="selected"
            to={link.url}
            onClick={clickCallback}
          >
            {link.label}
            <RightArrowIcon className="header__mobile-dropdown__icon" />
          </NavLink>
        </li>
      ))}
      <li onClick={logout}>
        <span>
          Logout
          <RightArrowIcon className="header__mobile-dropdown__icon" />
        </span>
      </li>
    </ul>
  </div>
);

HeaderMobileDropdown.propTypes = {
  isActive: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export default HeaderMobileDropdown;
