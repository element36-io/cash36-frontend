import React from 'react';
import { connect } from 'react-redux';
import Logo from '../Logo';
import Responsive from '../Responsive';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

import './Header.scss';

const Header = props => {
  const { auth: { isAuthenticated } } = props;

  if (!isAuthenticated) return null;

  return (
    <header>
      <Logo />
      <Responsive>
        <HeaderDesktop />
      </Responsive>
      <Responsive isMobile>
        <HeaderMobile />
      </Responsive>
    </header>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null, null, { pure: false })(Header);
