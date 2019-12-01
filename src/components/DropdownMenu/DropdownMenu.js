import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import './DropdownMenu.scss';

const DropdownMenu = () => {
  const [showActions, setShowActions] = useState(false);
  const [error, setError] = useState('');

  const openActions = () => {
    setShowActions(true);
  };

  const closeActions = () => {
    if (!showActions) return;
    setShowActions(false);
  };

  return (
    <div className="dropdown-menu">
      {' '}
      <ClickAwayListener onClickAway={closeActions}>
        <div className="contacts__list-item__actions">
          <IconButton
            onClick={openActions}
            className="contacts__list-item__actions__icon"
          >
            <MoreVertIcon />
          </IconButton>
          <div
            className={`paper contacts__list-item__actions__content ${
              showActions ? '--active' : ''
            }`}
            data-testid="contact__item__menu-button"
          >
            <MenuItem onClick={() => {}}>Remove</MenuItem>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default DropdownMenu;
