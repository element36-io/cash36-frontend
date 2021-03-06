import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
// io.element36.cash36.exchange.enums.NotificationType => MESSAGE,PAYMENT,PAYOUT, TRANSFER, TIER_2_FAILED, TIER_2_CONFIRMED,INTRAMESSAGE	

    const newNotifications = notifications.slice(0, badgeCount);
    const newTransaction = newNotifications.some(
      n => n.type === 'PAYMENT' || n.type === 'PAYOUT' || n.type === 'TRANSFER'
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
      console.error(error);
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

Header.propTypes = {
  logout: PropTypes.func,
  fetchNotifications: PropTypes.func,
  getTokens: PropTypes.func,
  getUserActivity: PropTypes.func,
  getUserInfo: PropTypes.func,
  getWallets: PropTypes.func,
  notifications: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  auth: PropTypes.object
};

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
