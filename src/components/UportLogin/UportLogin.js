import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import MobileDetect from 'mobile-detect';
import { getLoginQr, checkRequestStatus } from '../../helpers/uport.helpers';
import appStoreBadge from '../../assets/Login/app-store-badge.svg';
import googlePlayBadge from '../../assets/Login/google-play-badge.svg';
import './UportLogin.scss';

const appStoreUrl = [
  {
    url: 'https://itunes.apple.com/us/app/uport-id/id1123434510',
    icon: appStoreBadge,
    alt: 'app-store-badge'
  },
  {
    url: 'https://play.google.com/store/apps/details?id=com.uportMobile',
    icon: googlePlayBadge,
    alt: 'google-play-badge'
  }
];

const UportLogin = ({ onSuccess, onError, type }) => {
  const [qr, setQr] = useState(null);
  const _isMounted = useRef(true);
  const md = useRef(new MobileDetect(window.navigator.userAgent));
  const showQr =
    !md.current.mobile() || (md.current.mobile() && md.current.tablet());

  const isActive = () => {
    return _isMounted.current;
  };

  const getQr = async () => {
    try {
      const requestResponse = await getLoginQr(type);
      const { callbackUrl, uri, mobileUri } = requestResponse.data;

      if (md.current.mobile() && !md.current.tablet()) {
        window.location.assign(mobileUri);
        return;
      }

      setQr(uri);
      const uportCreds = await checkRequestStatus(
        callbackUrl,
        () => !isActive()
      );
      onSuccess(uportCreds);
    } catch (error) {
      onError(error.message);
    }
  };

  useEffect(() => {
    getQr();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  return (
    <div className="uport-login">
      {showQr && (
        <div className="uport-login__qr">
          {qr ? (
            <QRCode value={qr} size={250} />
          ) : (
            <div className="blur">
              <QRCode size={250} value={''} />
            </div>
          )}
        </div>
      )}
      <div className="uport-login__stores">
        <p>Need a uPort Account?</p>
        <div className="login__apps">
          {appStoreUrl.map(app => (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              key={app.alt}
            >
              <img src={app.icon} alt={app.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

UportLogin.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  type: PropTypes.string
};

export default UportLogin;
