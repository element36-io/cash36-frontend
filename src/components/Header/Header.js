import React from 'react';
import { connect } from 'react-redux';
import Logo from '../Logo';
import Responsive from '../Responsive';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { logout } from '../../store/auth/auth.actions';
import './Header.scss';

const Header = props => {
  const { auth: { isAuthenticated, user }, logout } = props;

  if (!isAuthenticated) return null;

  return (
    <header>
      <Logo />
      <Responsive>
        <HeaderDesktop logout={logout} />
      </Responsive>
      <Responsive isMobile>
        <HeaderMobile user={user} logout={logout} />
      </Responsive>
    </header>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logout }, null, { pure: false })(Header);
