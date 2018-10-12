import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import './AuthContainer.scss';

import Logo from '../Logo';
import Nav from './Nav/Nav';

const AuthContainer = props => {
    const {authed, children} = props;
    return (
      authed
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
            <Nav />
            <div className='auth-container__big-logo'>
              <Typography>36</Typography>
              <Typography>Cash</Typography>
            </div>
          </div>
        </div>

    );
};

const mapStateToProps = ({ auth }) => ({ authed: auth.isAuthenticated });

export default connect(mapStateToProps)(AuthContainer);
