import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import UserProfile from '../../UserProfile';
import navLinks from '../navLinks';
import ManageWalletsMobile from '../../ManageWallets/ManageWalletsMobile/ManageWalletsMobile';

import './HeaderMobileDropdown.scss';

const HeaderMobileDropdown = ({
  isActive,
  logout,
  clickCallback,
  currentLevel,
  hasWallet
}) => {
  return (
    <div className={`header__mobile-dropdown ${isActive ? 'active' : ''}`}>
      <UserProfile alt />
      <ul className="paper">
        {navLinks.map(link =>
          !hasWallet && link.label === 'Sell' ? (
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
        <ManageWalletsMobile />
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

const mapStateToProps = state => ({
  hasWallet: Boolean(state.wallets.walletList.length)
});

HeaderMobileDropdown.propTypes = {
  currentLevel: PropTypes.string,
  hasWallet: PropTypes.bool,
  isActive: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(HeaderMobileDropdown);
