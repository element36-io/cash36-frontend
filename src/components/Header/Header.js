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

  state = {
    showNotifications: false
  }

  eventSource = null;

  //Fix this with subroutes
  componentDidUpdate (prevProps) {
    const { auth: { isAuthenticated }, notifications: { isFetching, notifications }, fetchNotifications } = this.props;
    if (isAuthenticated && !notifications && !isFetching) {
      fetchNotifications(localStorage.getItem('lastRead'));
      this.connectWs();
    }
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
    const { auth: { user } } = this.props;
    let socket = new SockJS(`${API_ROOT}/ws`);
    this.eventSource = Stomp.over(socket);
    this.eventSource.connect({}, (frame) => {
      this.eventSource.subscribe(`/topics/updates/${user.username}`, (message) => {
        this.props.newNotification(JSON.parse(message.body));
      });
    }, (e) => {
      console.error(e, 'Connection lost');
      if (e.startsWith('Whoops!')) {
        // this.setState({ message: e, snackOpen: true, actionEnabled: true, autoHideDuration: null });
      }
    });
  };


  closeNotifications = () => {
    this.setState({showNotifications: false})
    localStorage.setItem('lastRead', new Date());
  };

  render () {
    const { auth: { isAuthenticated, user }, logout } = this.props;

    if (!isAuthenticated) return null;

    return (
      <header>
        <Logo/>
        <Responsive>
          <HeaderDesktop logout={logout} user={user}/>
        </Responsive>
        <Responsive isMobile>
          <HeaderMobile user={user} logout={logout}/>
        </Responsive>
      </header>
    );
  }
}

const mapStateToProps = ({ auth, notifications }) => ({ auth, notifications });

export default connect(mapStateToProps, { logout, fetchNotifications, newNotification }, null, { pure: false })(Header);
