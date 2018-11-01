import React, { Component } from 'react';
import { connect } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { API_ROOT } from '../../config/api';
import Logo from '../Logo';
import Responsive from '../Responsive';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { logout, getKyc } from '../../store/auth/auth.actions';
import { fetchNotifications, newNotification } from '../../store/notifications/notifications.actions';
import { getTokens, getUserActivity } from '../../store/tokens/tokens.actions';
import './Header.scss';

class Header extends Component {
  eventSource = null;

  componentDidMount () {
    this.props.fetchNotifications(localStorage.getItem('lastRead'));
    this.connectWs();
  }

  componentWillUnmount () {
    if (this.eventSource != null) {
      try {
        this.eventSource.disconnect();
      } catch (err) {
        // ignore the case if not yet connected
      }
    }
  }

  connectWs = () => {
    const { auth: { user }, newNotification, getKyc, getTokens, getUserActivity } = this.props;
    let socket = new SockJS(`${API_ROOT}/ws`);
    this.eventSource = Stomp.over(socket);
    this.eventSource.connect({}, () => {
      this.eventSource.subscribe(`/topics/updates/${user.username}`, (message) => {
        const messageBody = JSON.parse(message.body);
        newNotification(messageBody);
        const { type } = messageBody;

        if (type === 'PAYMENT' || type === 'PAYOUT') {
          getTokens();
          getUserActivity();
        }

        if (type === 'TIER_2_CONFIRMED') {
          getKyc();
        }
      });
    }, (err) => {
      console.error(err, 'Connection lost');
      if (err.startsWith('Whoops!')) {
        // this.setState({ message: e, snackOpen: true, actionEnabled: true, autoHideDuration: null });
      }
    });
  };

  render () {
    const { auth: { user }, logout } = this.props;

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
  }
}

const mapStateToProps = ({ auth, notifications }) => ({ auth, notifications });

export default connect(mapStateToProps, {
  logout,
  fetchNotifications,
  newNotification,
  getTokens,
  getUserActivity,
  getKyc
}, null, { pure: false })(Header);
