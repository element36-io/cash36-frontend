import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/KeyboardArrowDown';
import './HeaderMenu.scss';

class HeaderMenu extends Component {
    state = {
      anchorEl: null
    };

    handleClick = evt => {
      this.setState({ anchorEl: evt.currentTarget });
    };

    handleClose = evt => {
      this.setState({ anchorEl: null });
    };

    render () {
      const { anchorEl } = this.state;
      const { logout } = this.props;

      return (
        <div className='header__menu'>
          <span><i className='fas fa-user' /></span>
          <MenuIcon
            onClick={this.handleClick}
            className='header__menu__icon'
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>

      );
    }
}

HeaderMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

export default HeaderMenu;
