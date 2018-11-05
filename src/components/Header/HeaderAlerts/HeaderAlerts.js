import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLastRead, resetBadgeCount } from '../../../store/notifications/notifications.actions';
import Notification from '../Notification';
import PopUp from '../../PopUp';
import './HeaderAlerts.scss';

class HeaderAlerts extends Component {
  state = {
    open: false
  };

  openNotifications = () => {
    if (this.state.open) return;
    this.setState({ open: true });
  };

  closeNotifications = () => {
    const lastRead = new Date().toISOString();
    const { resetBadgeCount, updateLastRead } = this.props;
    this.setState({ open: false });
    updateLastRead(lastRead);
    resetBadgeCount();
    localStorage.setItem('lastRead', lastRead);
  };

  render () {
    const { notifications: { badgeCount, notifications, lastRead } } = this.props;
    const { open } = this.state;

    return (
      <div className='header__alerts' onClick={this.openNotifications}>
        <i className='fas fa-bell'/>
        {!!badgeCount && <span className='header__alerts__counter'>{badgeCount}</span>}
        {notifications && !!notifications.length && (
          <PopUp open={open} timeout={200} classNames='alerts' onClickAway={this.closeNotifications}>
            <div className='header__alerts__content'>
              {notifications && notifications.map(n => (
                <Notification {...n} lastRead={lastRead} key={n.creationDate} />
              ))}
            </div>
          </PopUp>
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
