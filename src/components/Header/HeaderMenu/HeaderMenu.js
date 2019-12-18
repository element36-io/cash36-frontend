import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/KeyboardArrowDown';
import { Tooltip } from '@material-ui/core';

import Avatar from '../../../components/Avatar';
import ManageWallets from '../../../components/ManageWallets';

import './HeaderMenu.scss';

const HeaderMenu = ({
  logout,
  user: { avatarUri, name, username, currentLevel }
}) => {
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
            <ManageWallets />
            {currentLevel === 'Tier_2' ? (
              <MenuItem>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfmui57gNtK-wbjdPCl4iBdi3LLLEz01H67nT4trXhA4nwCdw/viewform"
                >
                  Register an organization
                </a>
              </MenuItem>
            ) : (
              <MenuItem style={{ opacity: '0.5' }}>
                <Tooltip title="You need to be a verified user to register an organization">
                  <span>Register an organization</span>
                </Tooltip>
              </MenuItem>
            )}
            <MenuItem>
              <Link to="/contacts">Contacts</Link>
            </MenuItem>
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
