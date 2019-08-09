import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  updateLastRead,
  resetBadgeCount
} from '../../../store/notifications/notifications.actions';
import Notification from '../Notification';
import './HeaderAlerts.scss';

const HeaderAlerts = ({
  notifications: { badgeCount, notifications, lastRead },
  updateLastRead,
  resetBadgeCount
}) => {
  const [open, setOpen] = useState(false);

  const updateLastReadAndBadgeCount = () => {
    const lastRead = new Date().toISOString();
    updateLastRead(lastRead);
    resetBadgeCount();
    localStorage.setItem('lastRead', lastRead);
  };

  const toggleNotification = () => {
    if (!notifications.length) return;
    if (open) updateLastReadAndBadgeCount();
    setOpen(!open);
  };

  const closeNotifications = () => {
    if (!open) return;
    setOpen(false);
    updateLastReadAndBadgeCount();
  };

  return (
    <ClickAwayListener onClickAway={closeNotifications}>
      <div className="header__alerts">
        <span className="header__alerts__icon" onClick={toggleNotification}>
          {!!badgeCount && (
            <span className="header__alerts__counter">{badgeCount}</span>
          )}
        </span>

        {notifications && !!notifications.length && (
          <div
            className={`header__alerts__content ${
              open ? 'header__alerts--active' : ''
            }`}
          >
            {notifications &&
              notifications.map(n => (
                <Notification {...n} lastRead={lastRead} key={n.creationDate} />
              ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

HeaderAlerts.propTypes = {
  notifications: PropTypes.object,
  updateLastRead: PropTypes.func.isRequired,
  resetBadgeCount: PropTypes.func.isRequired
};

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(
  mapStateToProps,
  { updateLastRead, resetBadgeCount }
)(HeaderAlerts);
