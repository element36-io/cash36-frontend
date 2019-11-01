import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

import HeaderMenu from './HeaderMenu';
import HeaderAlerts from './HeaderAlerts';
import navLinks from './navLinks';

const HeaderDesktop = ({ logout, user, hasWallet }) => (
  <Fragment>
    <ul>
      {navLinks.map(link =>
        !hasWallet && link.label === 'Sell' ? (
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

const mapStateToProps = state => ({
  hasWallet: Boolean(state.wallets.walletList.length)
});

HeaderDesktop.propTypes = {
  hasWallet: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(HeaderDesktop);
