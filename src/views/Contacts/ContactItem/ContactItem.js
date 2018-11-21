import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './ContactItem.scss';

class ContactItem extends PureComponent {
  state = {
    openMenu: false
  };

  quickTransfer = () => {
    console.log('======== QUICK TRANSFER');
  };

  render () {
    const { contact: { contactName, contactAddress, avatarUrl } } = this.props;

    return (
      <div className='contact__list__item'>
        <div className="contacts__list__item__actions">
          <MoreVertIcon className="contacts__list__item__actions__icon"/>
        </div>
        <div className='contact__item__image-wrapper'>
          {avatarUrl ? <img src={avatarUrl} alt={contactName} /> : <i className='fas fa-user' />}
        </div>
        <div className='contacts__item__info'>
          <h4>{contactName}</h4>
          <span>{contactAddress}</span>
        </div>
        <span className='contact__list__item__btn' onClick={this.quickTransfer}>
          <span>Quick</span> Transfer
        </span>
      </div>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  removeCallback: PropTypes.func.isRequired
};

export default ContactItem;
