import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Responsive from '../../../components/Responsive';
import AppLinks from '../AppLinks';
import uportLogo from '../../../assets/Login/uport-logo.png';
import backgroundImage from '../../../assets/Login/background-image.jpg';
import './LoginWelcome.scss';

const LoginWelcome = ({ uPortUri }) => (
  <div className="login__welcome">
    <Responsive isMobile>
      <img src={backgroundImage} alt="element36" />
    </Responsive>
    <h2>Welcome</h2>
    <p>
      Welcome to <strong>element36!</strong> <br />
      <span>
        In order to use our website, please log in with{' '}
        <img src={uportLogo} alt="UPORT" />
      </span>
    </p>
    <div className="login__qrcode">
      {uPortUri && <QRCode value={uPortUri} size={250} />}
    </div>
    <AppLinks />
  </div>
);

LoginWelcome.propTypes = {
  uPortUri: PropTypes.string
};

export default LoginWelcome;
