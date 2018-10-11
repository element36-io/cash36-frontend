import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/KeyboardArrowDown';
import PopupMenu from '../../PopupMenu';
import './HeaderMenu.scss';

class HeaderMenu extends Component {
    state = {
      open: false,
      anchorEl: null
    };

    handleClick = evt => {
      this.setState({ open: true, anchorEl: evt.currentTarget });
    };

    handleClose = () => {
      this.setState({ open: false, anchorEl: null });
    };

    render () {
      const { open, anchorEl } = this.state;
      const { logout } = this.props;

      return (
        <div className='header__menu'>
          <span><i className='fas fa-user' /></span>
          <MenuIcon
            onClick={this.handleClick}
            className='header__menu__icon'

          />
          <PopupMenu handleClose={this.handleClose} open={open} anchor={anchorEl} placement='bottom-end'>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </PopupMenu>
        </div>

      );
    }
}

HeaderMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

export default HeaderMenu;
