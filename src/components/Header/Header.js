import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logo from '../Logo';
import Responsive from '../Responsive';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { logout, getUserInfo } from '../../store/auth/auth.actions';
import { fetchNotifications } from '../../store/notifications/notifications.actions';
import { getWallets } from '../../store/wallets/wallets.actions';
import { getTokens, getUserActivity } from '../../store/tokens/tokens.actions';
import './Header.scss';

const Header = ({
  auth: { user },
  notifications: { badgeCount, notifications },
  logout,
  fetchNotifications,
  getTokens,
  getUserActivity,
  getUserInfo,
  getWallets
}) => {
  useEffect(() => {
    if (badgeCount === 0) return;

    const newNotifications = notifications.slice(0, badgeCount);
    const newTransaction = newNotifications.some(
      n => n.type === 'PAYMENT' || n.type === 'PAYOUT'
    );
    const tier2Notification = newNotifications.some(
      n => n.type === 'TIER_2_CONFIRMED'
    );

    if (newTransaction) {
      getTokens();
      getUserActivity();
    }
    if (tier2Notification) getUserInfo();
  }, [badgeCount]);

  const callFetchNotifications = async () => {
    try {
      await fetchNotifications();
    } catch (error) {
      // TODO: handle the notification error
    }
  };

  useEffect(() => {
    fetchNotifications();
    getWallets();
    const notificationsInterval = setInterval(
      () => callFetchNotifications(),
      60000
    );

    return () => {
      clearInterval(notificationsInterval);
    };
  }, []);

  const { currentLevel } = user;

  return (
    <header>
      <Logo />
      <Responsive>
        <HeaderDesktop logout={logout} user={user} />
      </Responsive>
      <Responsive isMobile>
        <HeaderMobile logout={logout} currentLevel={currentLevel} />
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
    getUserInfo,
    getWallets
  },
  null,
  { pure: false }
)(Header);
