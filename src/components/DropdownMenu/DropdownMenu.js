import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import './DropdownMenu.scss';

const DropdownMenu = ({ menuItems = [] }) => {
  const [showActions, setShowActions] = useState(false);
  // const [error, setError] = useState('');

  const openActions = () => {
    setShowActions(true);
  };

  const closeActions = () => {
    if (!showActions) return;
    setShowActions(false);
  };

  return (
    <div className="dropdown-menu">
      <ClickAwayListener onClickAway={closeActions}>
        <div className="dropdown-menu__actions">
          <IconButton
            onClick={openActions}
            className="dropdown-menu__actions__icon"
          >
            <MoreVertIcon />
          </IconButton>

          <div
            className={`paper dropdown-menu__actions__content ${
              showActions ? '--active' : ''
            }`}
          >
            {menuItems.map(item => {
              return (
                <MenuItem key={item.title} onClick={item.action}>
                  {item.title}
                </MenuItem>
              );
            })}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

DropdownMenu.propTypes = {
  items: PropTypes.array
};

export default DropdownMenu;
