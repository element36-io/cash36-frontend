import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import './DropdownMenu.scss';

const DropdownMenu = ({ menuItems = [] }) => {
  const [showActions, setShowActions] = useState(false);
  // const [error, setError] = useState('');

  const openActions = () => {
    if (showActions) {
      setShowActions(false);
    }
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
            {menuItems.map(({ title, onClick }) => (
              <MenuItem key={title} onClick={onClick}>
                {title}
              </MenuItem>
            ))}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

DropdownMenu.propTypes = {
  menuItems: PropTypes.array
};

export default DropdownMenu;
