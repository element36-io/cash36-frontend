import React, { Component } from 'react';
import { connect } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { API_ROOT } from '../../config/api';
import Logo from '../Logo';
import Responsive from '../Responsive';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { logout } from '../../store/auth/auth.actions';
import { fetchNotifications, newNotification } from '../../store/notifications/notifications.actions';
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
    const { auth: { user }, newNotification } = this.props;
    let socket = new SockJS(`${API_ROOT}/ws`);
    this.eventSource = Stomp.over(socket);
    this.eventSource.connect({}, () => {
      this.eventSource.subscribe(`/topics/updates/${user.username}`, (message) => {
        newNotification(JSON.parse(message.body));
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

export default connect(mapStateToProps, { logout, fetchNotifications, newNotification }, null, { pure: false })(Header);
