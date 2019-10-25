import React, { useEffect, useRef } from 'react';
import MobileDetect from 'mobile-detect';
import LoginQr from './LoginQr';
import { verifyResponse } from '../../helpers/uport.helpers';

import './Login.scss';

const Login = ({ location }) => {
  const md = useRef(new MobileDetect(window.navigator.userAgent));

  const getMobileCreds = async () => {
    if (
      !(md.current.mobile() && !md.current.tablet()) ||
      !location.hash.includes('access_token')
    ) {
      return;
    }

    const accessToken = location.hash.substring(1).split('=')[1];
    const useMetamask = location.search.substring(1).split('=')[1] === 'true';

    try {
      const creds = await verifyResponse(accessToken);
    } catch (error) {
      console.warn(error.response);
    }
  };

  useEffect(() => {
    getMobileCreds();
  }, []);

  return <LoginQr />;
};

export default Login;
