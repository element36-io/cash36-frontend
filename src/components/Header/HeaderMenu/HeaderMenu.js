import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '../../../components/Avatar';

import './HeaderMenu.scss';

const HeaderMenu = ({ logout, user: { avatarUri, name, username } }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="header__menu">
      <Avatar
        avatarUrl={avatarUri}
        alt={name}
        cssClass="header__menu__image"
        username={username}
      />

      <ClickAwayListener onClickAway={closeMenu}>
        <span className="header__menu__anchor">
          <MenuIcon onClick={toggleMenu} className="header__menu__icon" />
          <div
            className={`paper header__menu__content${
              open ? ' header__menu__content--active' : ''
            }`}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </div>
        </span>
      </ClickAwayListener>
    </div>
  );
};

HeaderMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default HeaderMenu;
