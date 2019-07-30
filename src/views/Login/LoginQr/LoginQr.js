import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import mobile from 'is-mobile';
import Responsive from '../../../components/Responsive';
import { getLoginQr, checkRequestStatus } from '../../../helpers/uport.helpers';
import AppLinks from '../AppLinks';
import uportLogo from '../../../assets/Login/uport-logo.png';
import backgroundImage from '../../../assets/Login/background-image.jpg';
import './LoginQr.scss';

const LoginQr = ({ scanCallback, metamaskLogin }) => {
  const [qr, setQr] = useState(null);
  const [isMobile] = useState(mobile());
  const _isMounted = useRef(true);

  console.warn(isMobile);

  const isActive = () => {
    return _isMounted.current;
  };

  const getQr = async () => {
    try {
      const requestResponse = await getLoginQr(metamaskLogin);
      const { callbackUrl, uri, mobileUri } = requestResponse.data;

      if (isMobile) {
        window.location.assign(mobileUri);
        return;
      }

      setQr(uri);
      const creds = await checkRequestStatus(callbackUrl, () => !isActive());
      scanCallback(creds);
    } catch (error) {
      console.warn(error);
      // TODO: catch error1
      // throw new Error(error);
    }
  };

  useEffect(() => {
    getQr();

    return () => {
      _isMounted.current = false;
    };
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
        {!isMobile && qr && <QRCode value={qr} size={250} />}
      </div>
      <AppLinks />
    </div>
  );
};

LoginQr.propTypes = {
  scanCallback: PropTypes.func,
  metamaskLogin: PropTypes.bool
};

export default LoginQr;
