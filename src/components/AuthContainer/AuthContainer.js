import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import './AuthContainer.scss';

import Logo from '../Logo';
import AuthContainerNav from './AuthContainerNav';

const AuthContainer = props => {
    const {auth: {isAuthenticated, uportCreds}, children} = props;

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
            By signing in, you agree to <span>Cash36 Terms and Conditions & Privacy Policy</span>
            </div>
          </div>
          <div>
            <AuthContainerNav showRegister={Boolean(uportCreds)}/>
            <div className='auth-container__logo-alt'>
              <Typography>36</Typography>
              <Typography>Cash</Typography>
            </div>
          </div>
        </div>

    );
};

const mapStateToProps = ({ auth }) => ({auth });

export default connect(mapStateToProps)(AuthContainer);
