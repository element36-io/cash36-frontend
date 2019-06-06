import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderAlerts from './HeaderAlerts';
import NavBtn from '../NavBtn';
import HeaderMobileDropdown from './HeaderMobileDropdown';

const HeaderMobile = ({ logout }) => {
  const [activeNav, setActiveNav] = useState(false);

  const toggleNav = () => {
    setActiveNav(!activeNav);
  };

  return (
    <div>
      <HeaderAlerts />
      <NavBtn isActive={activeNav} clickHandler={toggleNav} />
      <HeaderMobileDropdown
        logout={logout}
        isActive={activeNav}
        clickCallback={toggleNav}
      />
    </div>
  );
};

HeaderMobile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default HeaderMobile;
