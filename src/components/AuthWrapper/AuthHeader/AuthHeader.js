import React from 'react';
import Responsive from '../../Responsive';
import Logo from '../../Logo';
import AuthHeaderMobile from './AuthHeaderMobile';
import './AuthHeader.scss';

const AuthHeader = () => (
  <div className="auth__header" data-testid="auth__header">
    <Responsive>
      <Logo />
    </Responsive>
    <Responsive isMobile>
      <AuthHeaderMobile />
    </Responsive>
  </div>
);

export default AuthHeader;
