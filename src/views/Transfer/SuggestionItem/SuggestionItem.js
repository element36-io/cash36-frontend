import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import Ink from 'react-ink';

import './SuggestionItem.scss';

class SuggestionItem extends PureComponent {
  clickHandler = () => {
    const { contact, clickCallback } = this.props;
    clickCallback(contact);
  };

  render () {
    const { contact } = this.props;

    return (
      <div className='transfer-address__suggestion-item' onClick={this.clickHandler}>
        <Avatar avatarUrl={contact.avatarUrl} alt={contact.contactName}
          cssClass='transfer-address__suggestion-item__avatar' />
        <span>{contact.contactName}</span>
        <Ink duration={500} />
      </div>
    );
  }
}

SuggestionItem.propTypes = {
  contact: PropTypes.object.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export default SuggestionItem;
