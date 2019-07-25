import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import BaseButton from '../../../components/Buttons/BaseButton/BaseButton';
import Avatar from '../../../components/Avatar';
import './ContactItem.scss';

const ContactItem = React.memo(({ contact, removeCallback, quickTransfer }) => {
  const [showActions, setShowActions] = useState(false);
  const [error, setError] = useState('');

  const openActions = () => {
    setShowActions(true);
  };

  const closeActions = () => {
    if (!showActions) return;
    setShowActions(false);
  };

  const transfer = () => {
    quickTransfer(contact);
  };

  const removeUser = async () => {
    try {
      await removeCallback(contact.id);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="contact__list-item">
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
          >
            <MenuItem onClick={removeUser}>Remove</MenuItem>
          </div>
        </div>
      </ClickAwayListener>
      <Avatar
        avatarUrl={contact.avatarUrl}
        cssClass="contact__item__image-wrapper"
        alt={contact.contactName}
        username={contact.contactAddress}
      />
      <div className="contacts__item__info">
        <h4>{contact.contactName}</h4>
        <span>{contact.contactAddress}</span>
      </div>
      <BaseButton className="contact__list-item__btn" onClick={transfer}>
        <span>
          <span>Quick</span> Transfer
        </span>
      </BaseButton>
      <div className="error-text">{error}</div>
    </div>
  );
});

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  removeCallback: PropTypes.func.isRequired,
  quickTransfer: PropTypes.func.isRequired
};

export default ContactItem;
