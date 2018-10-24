import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './AuthContainer.scss';

import Logo from '../Logo';
import AuthContainerNav from './AuthContainerNav';

export const AuthContainer = props => {
  const { auth: { isAuthenticated, uportCreds }, children } = props;

  return (
    isAuthenticated
      ? <Redirect to='/' />
      : <div className='auth-container'>
        <div>
          <div className='auth-container__header'>
            <Logo />
          </div>
          <div>
            {children}
          </div>
          <div className='auth-container__terms'>
            By signing in, you agree to <span>element36 Terms and Conditions & Privacy Policy</span>
          </div>
        </div>
        <div>
          <AuthContainerNav showRegister={Boolean(uportCreds)} />
        </div>
      </div>

  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AuthContainer);
