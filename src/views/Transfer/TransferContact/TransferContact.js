import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import Ink from 'react-ink';

import './TransferContact.scss';

const TransferContact = React.memo(({ contact, clickCallback, alt }) => {
  const clickHandler = () => {
    clickCallback(contact);
  };

  return (
    <div
      className={`transfer__contact ${alt ? 'transfer__contact--alt' : ''}`}
      onClick={clickHandler}
    >
      <Avatar
        avatarUrl={contact.avatarUrl}
        alt={contact.contactName}
        cssClass="transfer__contact__avatar"
        username={contact.contactAddress}
      />
      <span>{contact.contactName}</span>
      <Ink duration={500} />
    </div>
  );
});

TransferContact.propTypes = {
  contact: PropTypes.object.isRequired,
  clickCallback: PropTypes.func.isRequired,
  alt: PropTypes.bool
};

export default TransferContact;
