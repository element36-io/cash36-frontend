import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Delete from '@material-ui/icons/Delete';
import TruncateString from 'react-truncate-string';

import uportLogo from '../../assets/icons/uport_logo.svg';
import metamaskLogo from '../../assets/icons/metamask.svg';
import {
  setMainWallet,
  deleteWallet,
  getWallets
} from '../../store/wallets/wallets.actions';

const Wallet = ({ wallet, getWallets }) => {
  const [error, setError] = useState('');
  const { walletType, shortDescription, accountAddress, mainWallet } = wallet;

  const renderLogoSrc = () => {
    if (walletType === 'UPORT') return uportLogo;
    if (walletType === 'METAMASK') return metamaskLogo;
  };

  const callSetMainWallet = async () => {
    try {
      await setMainWallet(accountAddress);
      await getWallets();
    } catch (error) {
      setError(error);
    }
  };

  const callDeleteWallet = async () => {
    try {
      await deleteWallet(accountAddress);
      await getWallets();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Fragment>
      <div className="manage-wallets__wallet">
        <img src={renderLogoSrc()} alt="" />
        <div className="manage-wallets__wallet__text">
          <span>{shortDescription}</span>
          <span>
            <TruncateString text={accountAddress} />
          </span>
        </div>
        <div className="manage-wallets__wallet__buttons">
          {!mainWallet && (
            <button onClick={callSetMainWallet}>Make primary</button>
          )}
          {mainWallet && <span>Primary wallet</span>}
          <Delete onClick={callDeleteWallet} />
        </div>
      </div>

      {error && <div className="error-text">{error}</div>}
    </Fragment>
  );
};

Wallet.propTypes = {
  wallet: PropTypes.object.isRequired,
  getWallets: PropTypes.func
};

export default connect(null, { getWallets })(Wallet);
