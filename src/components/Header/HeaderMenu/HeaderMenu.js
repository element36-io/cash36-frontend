import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/KeyboardArrowDown';
import PopupMenu from '../../PopupMenu';
import './HeaderMenu.scss';

const HeaderMenu = props => {
  const { logout, open, anchorEl, closeCallback, openCallback, user: { avatarUri, name }, history } = props;
  const redirect = (path) => {
    history.push(path);
    closeCallback();
  };

  return (
    <div className='header__menu'>
      <span>
        {
          avatarUri
            ? <img src={avatarUri} alt={name} />
            : <i className='fas fa-user' />
        }
      </span>
      <MenuIcon
        onClick={openCallback}
        className='header__menu__icon'
      />
      <PopupMenu handleClose={closeCallback} open={open} anchor={anchorEl} placement='bottom-end'>
        <Fragment>
          <MenuItem onClick={() => { redirect('/settings'); }}>
            Settings
          </MenuItem>
          <MenuItem onClick={logout}>
            Logout
          </MenuItem>
        </Fragment>
      </PopupMenu>
    </div>

  );
};

HeaderMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  openCallback: PropTypes.func.isRequired,
  closeCallback: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  user: PropTypes.object
};

export default withRouter(HeaderMenu);
