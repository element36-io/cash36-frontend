import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import BaseButton from '../../../components/Buttons/BaseButton/BaseButton';
import Avatar from '../../../components/Avatar';
import './ContactItem.scss';

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
    this.props.quickTransfer(this.props.contact);
  };

  removeUser = () => {
    const {
      contact: { id },
      removeCallback
    } = this.props;
    removeCallback(id);
  };

  render () {
    const {
      contact: { contactName, contactAddress, avatarUrl }
    } = this.props;
    const { showActions } = this.state;

    return (
      <div className="contact__list-item">
        <ClickAwayListener onClickAway={this.closeActions}>
          <div className="contacts__list-item__actions">
            <IconButton
              onClick={this.toggleActions}
              className="contacts__list-item__actions__icon"
            >
              <MoreVertIcon />
            </IconButton>
            <div
              className={`paper contacts__list-item__actions__content ${
                showActions ? '--active' : ''
              }`}
            >
              <MenuItem onClick={this.removeUser}>Remove</MenuItem>
            </div>
          </div>
        </ClickAwayListener>
        <Avatar
          avatarUrl={avatarUrl}
          cssClass="contact__item__image-wrapper"
          alt={contactName}
          username={contactAddress}
        />
        <div className="contacts__item__info">
          <h4>{contactName}</h4>
          <span>{contactAddress}</span>
        </div>
        <BaseButton
          className="contact__list-item__btn"
          onClick={this.quickTransfer}
        >
          <span>
            <span>Quick</span> Transfer
          </span>
        </BaseButton>
      </div>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  removeCallback: PropTypes.func.isRequired,
  quickTransfer: PropTypes.func.isRequired
};

export default ContactItem;
