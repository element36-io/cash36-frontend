import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
// import MobileDetect from 'mobile-detect';
import DoneIcon from '@material-ui/icons/Done';
import AddWalletForm from '../AddWalletForm';
import { getLoginQr, checkRequestStatus } from '../../helpers/uport.helpers';
import { Web3Context } from '../../providers/web3.provider';
import uportLogo from '../../assets/icons/uport_logo.svg';
import appStoreBadge from '../../assets/Login/app-store-badge.svg';
import googlePlayBadge from '../../assets/Login/google-play-badge.svg';

import './AddUportWallet.scss';

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

const AddUportWallet = ({ addWallet, walletList }) => {
  const [qr, setQr] = useState(null);
  const [creds, setCreds] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const { network, networkId } = useContext(Web3Context);
  const _isMounted = useRef(true);
  // const md = useRef(new MobileDetect(window.navigator.userAgent));
  // const showQr =
  //   !md.current.mobile() || (md.current.mobile() && md.current.tablet());

  const changeDescription = event => setDescription(event.target.value);

  const isActive = () => {
    return _isMounted.current;
  };

  const getQr = async () => {
    try {
      const requestResponse = await getLoginQr();
      const { callbackUrl, uri } = requestResponse.data;
      // const { callbackUrl, uri, mobileUri } = requestResponse.data;

      // if (md.current.mobile() && !md.current.tablet()) {
      //   window.location.assign(mobileUri);
      //   return;
      // }

      setQr(uri);
      const uportCreds = await checkRequestStatus(
        callbackUrl,
        () => !isActive()
      );
      setCreds(uportCreds);
    } catch (error) {
      setError(error.message);
    }
  };

  const saveWallet = async evt => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      await addWallet(
        creds.address,
        'UPORT',
        networkId,
        description,
        creds.username
      );
      setSubmitted(true);
    } catch (err) {
      setError(err);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getQr();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const filteredWallet = walletList.filter(wallet =>
    creds ? wallet.accountAddress === creds.address : null
  )[0];

  return (
    <div className="add-uport-wallet">
      <img src={uportLogo} alt="uPort" />

      {creds ? (
        <div className="add-uport-wallet__creds">
          <p>Address: {creds.address}</p>
          <p>Network: {network}</p>
          {filteredWallet && !submitted && (
            <p>Wallet already registered with user</p>
          )}
          {!submitted && !filteredWallet && (
            <AddWalletForm
              onChange={changeDescription}
              value={description}
              error={error}
              onSubmit={saveWallet}
              submitting={submitting}
            />
          )}
          {submitted && (
            <span className="add-wallet__success">
              <DoneIcon />
            </span>
          )}
        </div>
      ) : (
        <>
          <div className="add-uport-wallet__qr">
            {qr ? (
              <QRCode value={qr} size={250} />
            ) : (
              <div className="blur">
                <QRCode size={250} value={''} />
              </div>
            )}
          </div>
          <div className="add-uport-wallet__stores">
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
        </>
      )}
    </div>
  );
};

AddUportWallet.propTypes = {
  addWallet: PropTypes.func,
  walletList: PropTypes.array
};

export default AddUportWallet;
