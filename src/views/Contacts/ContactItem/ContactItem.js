import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import BaseButton from '../../../components/Buttons/BaseButton/BaseButton';
import Avatar from '../../../components/Avatar';
import './ContactItem.scss';

const ContactItem = ({ contact, removeCallback }) => {
  const [showActions, setShowActions] = useState(false);
  const [error, setError] = useState('');

  const openActions = () => {
    setShowActions(true);
  };

  const closeActions = () => {
    if (!showActions) return;
    setShowActions(false);
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
            data-testid="contact__item__menu-button"
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
      <Link to={{ pathname: '/buy', state: { quickTransfer: contact } }}>
        <BaseButton className="contact__list-item__btn">
          <span>
            <span>Quick</span> Transfer
          </span>
        </BaseButton>
      </Link>
      <div className="error-text">{error}</div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  removeCallback: PropTypes.func.isRequired
};

export default memo(ContactItem);
