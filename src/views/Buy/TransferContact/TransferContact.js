import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import Ink from 'react-ink';

import './TransferContact.scss';

const TransferContact = ({ contact, clickCallback, alt }) => {
  const clickHandler = () => {
    clickCallback(contact);
  };

  const { avatarUrl, contactName, contactAddress } = contact;

  return (
    <div
      className={`transfer__contact ${alt ? 'transfer__contact--alt' : ''}`}
      onClick={clickHandler}
    >
      <Avatar
        avatarUrl={avatarUrl}
        alt={contactName}
        cssClass="transfer__contact__avatar"
        username={contactAddress}
      />
      <span>{contactName}</span>
      <Ink duration={500} />
    </div>
  );
};

TransferContact.propTypes = {
  contact: PropTypes.object.isRequired,
  clickCallback: PropTypes.func.isRequired,
  alt: PropTypes.bool
};

export default memo(TransferContact);
