import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLastRead, resetBadgeCount } from '../../../store/notifications/notifications.actions';
import Notification from '../Notification';
import PopupMenu from '../../PopupMenu';
import './HeaderAlerts.scss';

class HeaderAlerts extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  openNotifications = evt => {
    this.setState({ open: true, anchorEl: evt.currentTarget });
  };

  closeNotifications = () => {
    const lastRead = new Date().toISOString();
    const { resetBadgeCount, updateLastRead } = this.props;
    this.setState({ open: false, anchorEl: null });
    updateLastRead(lastRead);
    resetBadgeCount();
    localStorage.setItem('lastRead', lastRead);
  };

  render () {
    const { notifications: { badgeCount, notifications, lastRead } } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <div className='header__alerts' onClick={this.openNotifications}>
        <i className='fas fa-bell' />
        {!!badgeCount && <span className='header__alerts__counter'>{badgeCount}</span>}
        {notifications && !!notifications.length && (
          <PopupMenu handleClose={this.closeNotifications} open={open} anchor={anchorEl} placement='bottom-end'>
            <div className='header__alerts__notifications'>
              {notifications && notifications.map(n => (
                <Notification {...n} lastRead={lastRead} key={n.creationDate} />
              ))}
            </div>
          </PopupMenu>
        )}
      </div>
    );
  }
}

HeaderAlerts.propTypes = {
  notifications: PropTypes.object,
  updateLastRead: PropTypes.func.isRequired,
  resetBadgeCount: PropTypes.func.isRequired
};

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(mapStateToProps, { updateLastRead, resetBadgeCount })(HeaderAlerts);
