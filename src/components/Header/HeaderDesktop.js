import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import HeaderAlerts from './HeaderAlerts';
import navLinks from './navLinks';

const HeaderDesktop = ({ logout, user }) => (
  <Fragment>
    <ul>
      {navLinks.map(link => (
        <li key={link.label}>
          <NavLink exact activeClassName="selected" to={link.url}>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
    <div>
      <HeaderAlerts />
      <HeaderMenu logout={logout} user={user} />
    </div>
  </Fragment>
);

HeaderDesktop.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default HeaderDesktop;
