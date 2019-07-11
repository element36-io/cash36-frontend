import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logo from '../Logo';
import Responsive from '../Responsive';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { logout, getUserInfo } from '../../store/auth/auth.actions';
import { fetchNotifications } from '../../store/notifications/notifications.actions';
import { getTokens, getUserActivity } from '../../store/tokens/tokens.actions';
import './Header.scss';

const Header = ({
  auth: { user },
  notifications: { badgeCount },
  logout,
  fetchNotifications,
  getTokens,
  getUserActivity
}) => {
  useEffect(() => {
    if (badgeCount === 0) return;
    getTokens();
    getUserActivity();
  }, [badgeCount]);

  useEffect(() => {
    fetchNotifications();
    const notificationsInterval = setInterval(
      () => fetchNotifications(),
      6000000
    );

    return () => {
      clearInterval(notificationsInterval);
    };
  }, []);

  return (
    <header>
      <Logo />
      <Responsive>
        <HeaderDesktop logout={logout} user={user} />
      </Responsive>
      <Responsive isMobile>
        <HeaderMobile logout={logout} user={user} />
      </Responsive>
    </header>
  );
};

const mapStateToProps = ({ auth, notifications }) => ({ auth, notifications });

export default connect(
  mapStateToProps,
  {
    logout,
    fetchNotifications,
    getTokens,
    getUserActivity,
    getUserInfo
  },
  null,
  { pure: false }
)(Header);
