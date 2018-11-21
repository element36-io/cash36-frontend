import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './ContactItem.scss';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { Link } from 'react-router-dom';

class ContactItem extends PureComponent {
  state = {
    showActions: false
  };

  toggleActions = () => {
    this.setState({ showActions: !this.state.showActions });
  };

  closeActions = () => {
    if (!this.state.showActions) return;
    this.setState({ showActions: false });
  };

  quickTransfer = () => {
    console.log('======== QUICK TRANSFER');
  };

  removeUser = () => {
    const { contact: { id }, removeCallback } = this.props;
    removeCallback(id);
  };

  render () {
    const { contact: { contactName, contactAddress, avatarUrl } } = this.props;
    const { showActions } = this.state;

    return (
      <div className='contact__list-item'>
        <ClickAwayListener onClickAway={this.closeActions}>
          <div className="contacts__list-item__actions">
            <MoreVertIcon className="contacts__list-item__actions__icon" onClick={this.toggleActions}/>
            <div className={`paper contacts__list-item__actions__content ${showActions ? '--active' : ''}`}>
              <MenuItem onClick={this.removeUser}>
                Remove
              </MenuItem>
            </div>
          </div>
        </ClickAwayListener>
        <div className='contact__item__image-wrapper'>
          {avatarUrl ? <img src={avatarUrl} alt={contactName}/> : <i className='fas fa-user'/>}
        </div>
        <div className='contacts__item__info'>
          <h4>{contactName}</h4>
          <span>{contactAddress}</span>
        </div>
        <span className='contact__list-item__btn' onClick={this.quickTransfer}>
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
