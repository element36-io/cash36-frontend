import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Responsive from '../../../components/Responsive';
import { getLoginQr, checkRequestStatus } from '../../../helpers/uport.helpers';
import AppLinks from '../AppLinks';
import uportLogo from '../../../assets/Login/uport-logo.png';
import backgroundImage from '../../../assets/Login/background-image.jpg';
import './LoginQr.scss';

const LoginQr = ({ scanCallback }) => {
  const [qr, setQr] = useState(null);

  const getQr = async () => {
    try {
      const requestResponse = await getLoginQr();
      const { callbackUrl, uri } = requestResponse.data;
      setQr(uri);
      const creds = await checkRequestStatus(callbackUrl);
      scanCallback(creds);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getQr();
  }, []);

  return (
    <div className="login__qr">
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
        {qr && <QRCode value={qr} size={250} />}
      </div>
      <AppLinks />
    </div>
  );
};

LoginQr.propTypes = {
  scanCallback: PropTypes.func
};

export default LoginQr;