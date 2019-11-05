import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import MobileDetect from 'mobile-detect';
import { getLoginQr, checkRequestStatus } from '../../../helpers/uport.helpers';
import './LoginQr.scss';

const LoginQr = ({ scanCallback }) => {
  const [qr, setQr] = useState(null);
  const md = useRef(new MobileDetect(window.navigator.userAgent));
  const _isMounted = useRef(true);
  const showQr =
    !md.current.mobile() || (md.current.mobile() && md.current.tablet());

  const isActive = () => {
    return _isMounted.current;
  };

  const getQr = async () => {
    try {
      const requestResponse = await getLoginQr();
      const { callbackUrl, uri, mobileUri } = requestResponse.data;

      if (md.current.mobile() && !md.current.tablet()) {
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
      {showQr && (
        <div className="login__qrcode">
          {qr ? (
            <QRCode value={qr} size={250} />
          ) : (
            <div className="blur">
              <QRCode size={250} value={''} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

LoginQr.propTypes = {
  scanCallback: PropTypes.func
};

export default LoginQr;
