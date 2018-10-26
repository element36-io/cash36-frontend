import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MNID } from 'uport-connect';
import uPort from '../../config/uport.config';
import Responsive from '../../components/Responsive';
import LoginSidebar from './LoginSidebar';
import LoginTerms from './LoginTerms';
import LoginHeader from './LoginHeader';
import API from '../../config/api';

import './Login.scss';
import LoginWelcome from './LoginWelcome/LoginWelcome';

class Login extends Component {
  state = {
    step: 0,
    uPortUri: '',
    uportCreds: null
  };

  componentDidMount () {
    uPort.requestCredentials({
      requested: [ 'name', 'avatar' ],
      verified: [ 'cash36KYC' ],
      notifications: true
    }, this.uPortURIHandler).then(uportCreds => {
      // Next step
      console.log(uportCreds);
      console.log(MNID.decode(uportCreds.networkAddress).address);
      // API
      // this.props.uportLogin(uportCreds);
    });
  }

  uPortURIHandler = uPortUri => {
    this.setState({ uPortUri });
  };



  renderStep = () => {
    const { step, uPortUri } = this.state;
    switch (step) {
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return <LoginWelcome uPortUri={uPortUri} />;
    }
  };

  render () {
    const { auth: { isAuthenticated } } = this.props;

    if (isAuthenticated) return <Redirect to='/' />;

    return (
      <div className='login'>
        <div>
          <LoginHeader />
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
