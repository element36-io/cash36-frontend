import React from 'react';
import backgroundImage from '../../assets/Login/background-image.jpg';
import Responsive from '../Responsive';
import AuthHeader from './AuthHeader';
import AuthSidebar from './AuthSidebar';
import AuthTerms from './AuthTerms';
import './AuthWrapper.scss';

const AuthWrapper = ({ children }) => (
  <div className="auth__wrapper">
    <div>
      <AuthHeader />
      <Responsive isMobile>
        <img src={backgroundImage} alt="element36" />
      </Responsive>
      <h2>Welcome</h2>
      {children}
      <AuthTerms />
    </div>
    <Responsive>
      <AuthSidebar />
    </Responsive>
  </div>
);

export default AuthWrapper;
