import React from 'react';
import PropTypes from 'prop-types';
import Responsive from '../../../components/Responsive';
import AppLinks from '../AppLinks';
import backgroundImage from '../../../assets/Login/background-image.jpg';
import uportLogo from '../../../assets/icons/uport.svg';
import metamaskLogo from '../../../assets/icons/metamask.svg';
import './LoginType.scss';

const LoginType = ({ selectLoginType }) => {
  const uportLogin = () => selectLoginType(false);
  const mmLogin = () => selectLoginType(true);

  return (
    <div className="login__type">
      <Responsive isMobile>
        <img src={backgroundImage} alt="element36" />
      </Responsive>
      <h2>Welcome</h2>
      <p>
        Welcome to <strong>element36!</strong> <br />
        <span>Please choose how you want to interact with element36</span>
      </p>
      <div className="login__types">
        <div onClick={uportLogin}>
          <span>Login with uPort only</span>
          <span>
            <img src={uportLogo} alt="uPort" />
          </span>
        </div>
        <div onClick={mmLogin}>
          <span>Login with uPort / MetaMask</span>
          <span>
            <img src={uportLogo} alt="uPort" />
            <img src={metamaskLogo} alt="Metamask" />
          </span>
        </div>
      </div>
      <AppLinks />
    </div>
  );
};

LoginType.propTypes = {
  selectLoginType: PropTypes.func
};

export default LoginType;
