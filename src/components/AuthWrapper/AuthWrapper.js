import React from 'react';
import PropTypes from 'prop-types';
import backgroundImage from '../../assets/Login/background-image.jpg';
import Responsive from '../Responsive';
import AuthHeader from './AuthHeader';
import AuthSidebar from './AuthSidebar';
import AuthTerms from './AuthTerms';
import './AuthWrapper.scss';

const AuthWrapper = ({ children, message = 'Welcome' }) => (
  <div className="auth__wrapper" data-testid="auth__wrapper">
    <div>
      <AuthHeader />
      <Responsive isMobile>
        <img src={backgroundImage} alt="element36" />
      </Responsive>
      <h2>{message}</h2>
      {children}
      <AuthTerms />
    </div>
    <Responsive>
      <AuthSidebar />
    </Responsive>
  </div>
);

AuthWrapper.propTypes = {
  message: PropTypes.string
};

export default AuthWrapper;
