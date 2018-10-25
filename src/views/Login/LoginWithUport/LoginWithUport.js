import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import QRCode from 'qrcode.react';
import uportLogo from '../../../assets/Login/uport-logo.png';
import appStoreBadge from '../../../assets/Login/app-store-badge.svg';
import googlePlayBadge from '../../../assets/Login/google-play-badge.svg';
import { uportLogin } from '../../../store/auth/auth.actions.js';

import uPort from '../../../config/uport.config';

import './LoginWithUport.scss';

class LoginWithUport extends Component {
  state = {
    uri: ''
  }

  uPortURIHandler = (uri) => {
    this.setState({ uri });
  }

  componentWillMount () {
    uPort.requestCredentials({
      requested: [ 'name', 'avatar' ],
      verified: [ 'cash36KYC' ],
      notifications: true
    }, this.uPortURIHandler).then((uportCreds) => {
      // Next step
      console.log(uportCreds);
      this.props.afterValid(uportCreds);
      this.props.uportLogin(uportCreds);
    });
  }

  render () {
    return (
      <div className='login-uport'>
        <Typography variant='title' className='login-uport__headline' paragraph>
          Welcome
        </Typography>
        <Typography>
          Welcome to <span>element36!</span> <br />
          <span className='login-uport__message'>
            In order to use our website, please log in with <img className='login-uport__logo' src={uportLogo} alt='UPORT' />
          </span>
        </Typography>
        <div className='login-uport__qrcode'>
          <QRCode value={this.state.uri} size={250} />
        </div>
        <Typography variant='caption' color='inherit'>Need a uPort Account?</Typography>
        <div className='login-uport__app-store-icons'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://itunes.apple.com/us/app/uport-id/id1123434510'
          >
            <img src={appStoreBadge} alt='app-store-badge' />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://play.google.com/store/apps/details?id=com.uportMobile'
          >
            <img src={googlePlayBadge} alt='google-play-badge' />
          </a>
        </div>
      </div>
    );
  }
}

export default connect(null, { uportLogin })(LoginWithUport);
