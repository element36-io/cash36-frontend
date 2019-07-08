import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Responsive from '../../components/Responsive';
import LoginSidebar from './LoginSidebar';
import LoginTerms from './LoginTerms';
import LoginHeader from './LoginHeader';
import LoginQr from './LoginQr';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import LoginType from './LoginType';
import MetamaskCheck from './MetamaskCheck';
import { checkUserId } from '../../store/auth/auth.actions';
import './Login.scss';

const Login = ({ auth: { isAuthenticated } }) => {
  const [step, setStep] = useState(0);
  const [creds, setCreds] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [metamaskLogin, setMetamaskLogin] = useState(false);

  const checkIfUserExists = async uportCreds => {
    const creds = { ...uportCreds };
    creds.id = creds.did.split(':').pop();
    setCreds(creds);
    console.warn(creds);
    try {
      await checkUserId(creds.id);
      setNewUser(false);
      metamaskLogin ? setStep(2) : setStep(3);
    } catch (err) {
      setNewUser(true);
      metamaskLogin ? setStep(2) : setStep(4);
    }
  };

  const selectLoginType = useMetamask => {
    setMetamaskLogin(useMetamask);
    setStep(1);
  };

  const metamaskCheckSuccess = account => {
    setCreds({ ...creds, account });
    newUser ? setStep(4) : setStep(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <LoginQr scanCallback={checkIfUserExists} />;
      case 2:
        return <MetamaskCheck callback={metamaskCheckSuccess} />;
      case 3:
        return <LoginForm creds={creds} useMetamask={metamaskLogin} />;
      case 4:
        return <RegisterForm creds={creds} useMetamask={metamaskLogin} />;
      default:
        return <LoginType selectLoginType={selectLoginType} />;
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="login">
      <div>
        <LoginHeader step={step} />
        {renderStep()}
        <Responsive>
          <LoginTerms />
        </Responsive>
      </div>
      <Responsive>
        <LoginSidebar />
      </Responsive>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Login);
