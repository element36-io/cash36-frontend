import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MNID } from 'uport-connect';
import { uPort, uportUri, setUportUri } from '../../config/uport.config';
import Responsive from '../../components/Responsive';
import LoginSidebar from './LoginSidebar';
import LoginTerms from './LoginTerms';
import LoginHeader from './LoginHeader';
import LoginWelcome from './LoginWelcome/LoginWelcome';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { checkUserAddress } from '../../store/auth/auth.actions';
import './Login.scss';

class Login extends Component {
  state = {
    step: 1,
    uPortUri: uportUri,
    // uportCreds: null
    uportCreds: {
      address: 'did:ethr:0xfacfa366a2ecbea07de2df72489d6f55083d2891',
      avatar: { uri: 'https://ipfs.infura.io/ipfs/QmdDfwccYJire5P4v76qP6WyYUFiDoz54zbDRuv8tVWhzU' },
      did: 'did:ethr:0xfacfa366a2ecbea07de2df72489d6f55083d2891',
      name: 'Vladimir Nikolic',
      networkAddress: '2oquUSd56AhWrVR81TKtuQgabpiCckHf4vw',
      publicEncKey: 'jV9a+a5dGPOrTiuRHcMEVRmZkIqmtktO8RWJhGseyiQ=',
      pushToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NDA5ODQ4MDksImV4cCI6MTU0MjI4MDgwOSwiYXVkIjoiMm96R1hGcXgzZUt6bWc3elFRWnVUbkVXNkVlQVZVenlVdTYiLCJ0eXBlIjoibm90aWZpY2F0aW9ucyIsInZhbHVlIjoiYXJuOmF3czpzbnM6dXMtd2VzdC0yOjExMzE5NjIxNjU1ODplbmRwb2ludC9HQ00vdVBvcnQvM2EyYWIxNGUtM2E4YS0zMzY1LTg2ZjMtODkyOWJjZDBhZGY1IiwiaXNzIjoiZGlkOmV0aHI6MHhmYWNmYTM2NmEyZWNiZWEwN2RlMmRmNzI0ODlkNmY1NTA4M2QyODkxIn0.cyK2qtrtio8zszBDep1llaLUIt5Bk3xX4VrQ253-_hG6ZQRBH2D4Zi__PpFPSBuYV9F8_SlLu6zWsUgJJV9CbwA',
      verified: []
    }
  };

  // componentDidMount () {
  //   uPort.requestCredentials({
  //     requested: ['name', 'avatar'],
  //     verified: ['cash36KYC'],
  //     notifications: true
  //   }, this.uPortURIHandler).then(this.checkIfUserExists);
  // }

  uPortURIHandler = uPortUri => {
    setUportUri(uPortUri);
    this.setState({ uPortUri });
  };

  checkIfUserExists = async uportCreds => {
    console.log(uportCreds);
    try {
      await checkUserAddress(MNID.decode(uportCreds.networkAddress).address);
      this.setState({ step: 1, uportCreds });
    } catch (err) {
      this.setState({ step: 2, uportCreds });
    }
  };

  renderStep = () => {
    const { step, uPortUri, uportCreds } = this.state;
    switch (step) {
      case 1:
        return <LoginForm uportCreds={uportCreds} />;
      case 2:
        return <RegisterForm uportCreds={uportCreds} />;
      default:
        return <LoginWelcome uPortUri={uPortUri} />;
    }
  };

  render () {
    const { auth: { isAuthenticated } } = this.props;
    const { step } = this.state;

    if (isAuthenticated) return <Redirect to='/' />;

    return (
      <div className='login'>
        <div>
          <LoginHeader step={step} />
          {this.renderStep()}
          <Responsive>
            <LoginTerms />
          </Responsive>
        </div>
        <Responsive>
          <LoginSidebar />
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Login);
