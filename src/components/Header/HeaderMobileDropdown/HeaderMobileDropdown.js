import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import UserProfile from '../../UserProfile';
import navLinks from '../navLinks';
import './HeaderMobileDropdown.scss';

const HeaderMobileDropdown = ({
  isActive,
  logout,
  clickCallback,
  currentLevel,
  noWallet = true
}) => {
  return (
    <div className={`header__mobile-dropdown ${isActive ? 'active' : ''}`}>
      <UserProfile alt />
      <ul className="paper">
        {navLinks.map(link =>
          noWallet && link.label === 'Sell' ? (
            <li key={link.label} style={{ opacity: '0.5' }}>
              <span>
                {link.label}
                <RightArrowIcon className="header__mobile-dropdown__icon" />
              </span>
            </li>
          ) : (
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
          )
        )}
        {currentLevel === 'Tier_2' ? (
          <li>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfmui57gNtK-wbjdPCl4iBdi3LLLEz01H67nT4trXhA4nwCdw/viewform">
              Create organization
              <RightArrowIcon className="header__mobile-dropdown__icon" />
            </a>
          </li>
        ) : (
          <li>
            <span style={{ opacity: '0.5' }}>
              Create organization
              <RightArrowIcon className="header__mobile-dropdown__icon" />
            </span>
          </li>
        )}
        <li onClick={logout}>
          <span>
            Logout
            <RightArrowIcon className="header__mobile-dropdown__icon" />
          </span>
        </li>
      </ul>
    </div>
  );
};

HeaderMobileDropdown.propTypes = {
  currentLevel: PropTypes.string,
  noWallet: PropTypes.bool,
  isActive: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export default HeaderMobileDropdown;
