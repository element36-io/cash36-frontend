import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import Ink from 'react-ink';

import './TransferContact.scss';

class TransferContact extends PureComponent {
  clickHandler = () => {
    const { contact, clickCallback } = this.props;
    clickCallback(contact);
  };

  render () {
    const { contact, alt } = this.props;

    return (
      <div className={`transfer__contact ${alt ? 'transfer__contact--alt' : ''}`} onClick={this.clickHandler}>
        <Avatar avatarUrl={contact.avatarUrl} alt={contact.contactName}
          cssClass='transfer__contact__avatar' />
        <span>{contact.contactName}</span>
        <Ink duration={500} />
      </div>
    );
  }
}

TransferContact.propTypes = {
  contact: PropTypes.object.isRequired,
  clickCallback: PropTypes.func.isRequired,
  alt: PropTypes.bool
};

export default TransferContact;
