import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Logo from '../Logo';
import Responsive from '../Responsive';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { logout, getUserInfo } from '../../store/auth/auth.actions';
import {
  fetchNotifications,
  newNotification
} from '../../store/notifications/notifications.actions';
import { getTokens, getUserActivity } from '../../store/tokens/tokens.actions';
import './Header.scss';

const Header = ({
  auth: { user },
  logout,
  fetchNotifications,
  newNotification,
  getTokens,
  getUserActivity,
  getUserInfo
}) => {
  const eventSource = useRef(null);

  const connectWs = () => {
    let socket = new SockJS(`http://localhost:8092/exchange/ws`); // TODO: change to a REAL api path
    eventSource.current = Stomp.over(socket);
    eventSource.current.connect(
      {},
      () => {
        eventSource.current.subscribe(
          `/topics/updates/${user.username}`,
          message => {
            const messageBody = JSON.parse(message.body);
            newNotification(messageBody);
            const { type } = messageBody;

            if (type === 'PAYMENT' || type === 'PAYOUT') {
              getTokens();
              getUserActivity();
            }

            if (type === 'TIER_2_CONFIRMED') {
              getUserInfo();
            }
          }
        );
      },
      err => {
        console.error(err, 'Connection lost');
      }
    );
  };

  useEffect(() => {
    fetchNotifications(localStorage.getItem('lastRead'));
    connectWs();

    return () => {
      if (eventSource.current != null) {
        try {
          eventSource.current.disconnect();
        } catch (err) {
          // ignore the case if not yet connected
        }
      }
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
    newNotification,
    getTokens,
    getUserActivity,
    getUserInfo
  },
  null,
  { pure: false }
)(Header);
