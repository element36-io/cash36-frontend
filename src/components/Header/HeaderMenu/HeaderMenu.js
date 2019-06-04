import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '../../../components/Avatar';

import './HeaderMenu.scss';

class HeaderMenu extends Component {
  state = {
    open: false
  };

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  closeMenu = () => {
    this.setState({ open: false });
  };

  render () {
    const {
      logout,
      user: { avatarUri, name }
    } = this.props;
    const { open } = this.state;

    return (
      <div className="header__menu">
        <Avatar
          avatarUrl={avatarUri}
          alt={name}
          cssClass="header__menu__image"
        />

        <ClickAwayListener onClickAway={this.closeMenu}>
          <span className="header__menu__anchor">
            <MenuIcon
              onClick={this.toggleMenu}
              className="header__menu__icon"
            />
            <div
              className={`paper header__menu__content${
                open ? ' header__menu__content--active' : ''
              }`}
            >
              {/* <MenuItem>
                <Link to="/settings" onClick={this.closeMenu}>
                    Settings
                </Link>
              </MenuItem> */}
              <MenuItem onClick={logout}>Logout</MenuItem>
            </div>
          </span>
        </ClickAwayListener>
      </div>
    );
  }
}

HeaderMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default HeaderMenu;
