import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

import HeaderMenu from './HeaderMenu';
import HeaderAlerts from './HeaderAlerts';
import navLinks from './navLinks';

const HeaderDesktop = ({ logout, user, noWallet = true }) => (
  <Fragment>
    <ul>
      {navLinks.map(link =>
        noWallet && link.label === 'Sell' ? (
          <li key={link.label}>
            <Tooltip title="You need to add a Wallet to be able to sell Tokens">
              <span>{link.label}</span>
            </Tooltip>
          </li>
        ) : (
          <li key={link.label}>
            <NavLink exact activeClassName="selected" to={link.url}>
              {link.label}
            </NavLink>
          </li>
        )
      )}
    </ul>
    <div>
      <HeaderAlerts />
      <HeaderMenu logout={logout} user={user} />
    </div>
  </Fragment>
);

HeaderDesktop.propTypes = {
  noWallet: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default HeaderDesktop;
