import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import './SelectedContact.scss';

const SelectedContact = ({
  contact: { contactName, avatarUrl, contactAddress }
}) => (
  <div className={`transfer__selected-contact`}>
    <Avatar
      avatarUrl={avatarUrl}
      cssClass="transfer__selected-contact__avatar"
      username={contactAddress}
    />
    <span>{contactName}</span>
  </div>
);

SelectedContact.propTypes = {
  contact: PropTypes.object
};

export default SelectedContact;
