import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import HeaderAlerts from './HeaderAlerts';
import navLinks from './navLinks';

const HeaderDesktop = () => {
  return (
    <Fragment>
      <ul>
        {navLinks.map(link => <li key={link.label}>
          <NavLink exact activeClassName='selected'
            to={link.url}>{link.label}</NavLink></li>
        )}
      </ul>
      <div>
        <HeaderAlerts alertsCount={3} />
        <HeaderMenu />
      </div>
    </Fragment>
  );
};

export default HeaderDesktop;
