import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Responsive from '../../components/Responsive';
import MobileDetect from 'mobile-detect';
import LoginSidebar from './LoginSidebar';
import LoginTerms from './LoginTerms';
import LoginHeader from './LoginHeader';
import LoginQr from './LoginQr';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import LoginType from './LoginType';
import MetamaskCheck from './MetamaskCheck';
import { checkUserId } from '../../store/auth/auth.actions';
import { verifyResponse } from '../../helpers/uport.helpers';

import './Login.scss';

const Login = ({ location, auth: { isAuthenticated } }) => {
  let [step, setStep] = useState(0);
  let [creds, setCreds] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [metamaskLogin, setMetamaskLogin] = useState(false);
  const md = useRef(new MobileDetect(window.navigator.userAgent));

  // if (process.env.NODE_ENV === 'test') {
  //   step = 3;

  //   creds = {
  //     address: '0x4f6f13571eb636915cde42f6101e59067bc98bcd',
  //     avatar: {
  //       uri:
  //         'https://ipfs.infura.io/ipfs/QmY4btiNiJwkBZb4KtqYCt2WjjW31VjBe7JhJ8Gf2v4QH7'
  //     },
  //     boxPub: '+mKhe2acG/ekkgvUXbz/vPMi+XrVX4v5TYCIvaHksXw=',
  //     did: 'did:ethr:0x89b5c95edf8aeca1366f83043e805aebe1992cce',
  //     id: '0x89b5c95edf8aeca1366f83043e805aebe1992cce',
  //     mnid: '2ok7qT3zyKJwfSKAnkzgYzhP7AEagRergEH',
  //     name: 'Tester Testerson',
  //     pushToken:
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NjcxNjIzNTAsImV4cCI6MTU5ODY5ODM1MCwiYXVkIjoiZGlkOmV0aHI6MHhiZTg1MDBmYmRiYTE5OTQ5ZWYyOTI4OTg0NThiYWI5YTQ4Mzg4M2MwIiwidHlwZSI6Im5vdGlmaWNhdGlvbnMiLCJ2YWx1ZSI6ImFybjphd3M6c25zOnVzLXdlc3QtMjoxMTMxOTYyMTY1NTg6ZW5kcG9pbnQvR0NNL3VQb3J0LzRiMTFlZjQ3LWJhZGMtMzlhZS1hMTBkLWUyM2FlYWU2YzNmMiIsImlzcyI6ImRpZDpldGhyOjB4ODliNWM5NWVkZjhhZWNhMTM2NmY4MzA0M2U4MDVhZWJlMTk5MmNjZSJ9.hPE6VW1tKRFKGfzW2tH8FuVNGJ0bqmSuIbJ1UNpd0rU5xgpkFNln_p8F5sd6o5JCHj45ov4l6K-Gq_nnS35eSgE',
  //     username: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
  //   };
  // }

  const checkIfUserExists = async uportCreds => {
    const creds = { ...uportCreds };
    creds.id = creds.did.split(':').pop();
    setCreds(creds);

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
        return (
          <LoginQr
            scanCallback={checkIfUserExists}
            metamaskLogin={metamaskLogin}
          />
        );
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

  const getMobileCreds = async () => {
    if (
      !(md.current.mobile() && !md.current.tablet()) ||
      !location.hash.includes('access_token')
    ) {
      return;
    }

    const accessToken = location.hash.substring(1).split('=')[1];
    const useMetamask = location.search.substring(1).split('=')[1] === 'true';

    setMetamaskLogin(useMetamask);

    try {
      const creds = await verifyResponse(accessToken);
      await checkIfUserExists(creds.data);
    } catch (error) {
      console.warn(error.response);
      // TODO: catch error
      // throw new Error(error);
    }
  };

  useEffect(() => {
    getMobileCreds();
  }, []);

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
