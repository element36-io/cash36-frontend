import React, { Fragment } from 'react';
import appStoreBadge from '../../../assets/Login/app-store-badge.svg';
import googlePlayBadge from '../../../assets/Login/google-play-badge.svg';
import './AppLinks.scss';

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

const AppLinks = () => (
  <Fragment>
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
  </Fragment>
);

export default AppLinks;
