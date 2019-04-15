import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Responsive from '../../../components/Responsive';
import uportLogo from '../../../assets/Login/uport-logo.png';
import appStoreBadge from '../../../assets/Login/app-store-badge.svg';
import googlePlayBadge from '../../../assets/Login/google-play-badge.svg';
import backgroundImage from '../../../assets/Login/background-image.jpg';
import './LoginWelcome.scss';

const appStoreUrl = [{
  url: 'https://itunes.apple.com/us/app/uport-id/id1123434510',
  icon: appStoreBadge,
  alt: 'app-store-badge'
},
{
  url: 'https://play.google.com/store/apps/details?id=com.uportMobile',
  icon: googlePlayBadge,
  alt: 'google-play-badge'
}];

const LoginWelcome = props => {
  const { uPortUri } = props;

  return (
    <div className="login__welcome">
      <Responsive isMobile>
        <img src={backgroundImage} alt="element36" />
      </Responsive>
      <h2>Welcome</h2>
      <p>
        Welcome to <strong>element36!</strong> <br />
        <span>
            In order to use our website, please log in with <img src={uportLogo} alt="UPORT" />
        </span>
      </p>
      <div className="login__qrcode">
        {uPortUri && <QRCode value={uPortUri} size={250} />}
      </div>
      <p>
        Need a uPort Account?
      </p>
      <div className="login__apps">
        {appStoreUrl.map(app => <a href={app.url} target="_blank" rel="noopener noreferrer" key={app.alt}><img
          src={app.icon} alt={app.alt} /></a>)}
      </div>
    </div>
  );
};

LoginWelcome.propTypes = {
  uPortUri: PropTypes.string
};

export default LoginWelcome;
