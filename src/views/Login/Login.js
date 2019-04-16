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
    step: 0,
    uPortUri: uportUri,
    uportCreds: null
  };

  componentDidMount () {
    uPort
      .requestCredentials(
        {
          requested: ['name', 'avatar'],
          verified: ['element36Tier1', 'element36Tier2'],
          notifications: true
        },
        this.uPortURIHandler
      )
      .then(this.checkIfUserExists);
  }

  uPortURIHandler = uPortUri => {
    setUportUri(uPortUri);
    this.setState({ uPortUri });
  };

  checkIfUserExists = async uportCreds => {
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
    const {
      auth: { isAuthenticated }
    } = this.props;
    const { step } = this.state;

    if (isAuthenticated) return <Redirect to="/" />;

    return (
      <div className="login">
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
