import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { updateLastRead, resetBadgeCount } from '../../../store/notifications/notifications.actions';
import Notification from '../Notification';
import './HeaderAlerts.scss';

class HeaderAlerts extends Component {
  state = {
    open: false
  };

  toggleNotification = evt => {
    if (this.state.open) {
      this.updateLastReadAndBadgeCount();
    }
    this.setState({ open: !this.state.open });
  };

  closeNotifications = (e) => {
    if (!this.state.open) return;
    this.setState({ open: false });
    this.updateLastReadAndBadgeCount();
  };

  updateLastReadAndBadgeCount = () => {
    const lastRead = new Date().toISOString();
    const { resetBadgeCount, updateLastRead } = this.props;
    updateLastRead(lastRead);
    resetBadgeCount();
    localStorage.setItem('lastRead', lastRead);
  }

  render () {
    const { notifications: { badgeCount, notifications, lastRead } } = this.props;
    const { open } = this.state;

    return (
      <ClickAwayListener onClickAway={this.closeNotifications}>
        <div className='header__alerts'>
          <span className='header__alerts__icon' onClick={this.toggleNotification} />
          {!!badgeCount && <span className='header__alerts__counter'>{badgeCount}</span>}
          {notifications && !!notifications.length && (
            <div className={`header__alerts__content ${open ? 'header__alerts--active' : ''}`}>
              {notifications && notifications.map(n => (
                <Notification {...n} lastRead={lastRead} key={n.creationDate} />
              ))}
            </div>
          )}
        </div>
      </ClickAwayListener>
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
