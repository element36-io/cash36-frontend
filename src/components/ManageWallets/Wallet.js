import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Delete from '@material-ui/icons/Delete';
import { Popover } from '@material-ui/core';
import TruncateString from 'react-truncate-string';

import DefaultButton from '../../components/Buttons/DefaultButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import uportLogo from '../../assets/icons/uport_logo.svg';
import metamaskLogo from '../../assets/icons/metamask.svg';
import {
  setMainWallet,
  deleteWallet,
  getWallets
} from '../../store/wallets/wallets.actions';
import { getTokens } from '../../store/tokens/tokens.actions';

const Wallet = ({ wallet, getWallets, getTokens }) => {
  const [error, setError] = useState('');
  const { walletType, shortDescription, accountAddress, mainWallet } = wallet;

  const [anchorEl, setAnchorEl] = useState(null);

  const openConfirmDelete = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeConfirmDelete = () => {
    setAnchorEl(null);
  };

  const renderLogoSrc = () => {
    if (walletType === 'UPORT') return uportLogo;
    if (walletType === 'METAMASK') return metamaskLogo;
  };

  const handleSetMainWallet = async () => {
    try {
      await setMainWallet(accountAddress);
      await getWallets();
      await getTokens();
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteWallet = async () => {
    try {
      await deleteWallet(accountAddress);
      await getWallets();
      closeConfirmDelete();
    } catch (error) {
      setError(error);
    }
  };

  const isOpenPopover = Boolean(anchorEl);

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
            <button onClick={handleSetMainWallet}>Make primary</button>
          )}
          {mainWallet && <span>Primary wallet</span>}
          <Delete onClick={openConfirmDelete} />
          <Popover
            open={isOpenPopover}
            onClose={closeConfirmDelete}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right'
            }}
          >
            <div style={{ maxWidth: '67rem', padding: '2rem' }}>
              <h3
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '500',
                  marginBottom: '1.6rem',
                  color: '#ff2525'
                }}
              >
                You are about to delete a wallet
              </h3>
              <p>
                You won't be able to to buy, send, sell and receive funds using
                this wallet anymore. Funds remain on the wallet and wallet can
                be readded anytime.
              </p>

              <div
                className="manage-wallets__wallet__delete__buttons"
                style={{
                  marginTop: '1.6rem',
                  display: 'flex',
                  width: '100%'
                }}
              >
                <DefaultButton
                  onClick={handleDeleteWallet}
                  style={{ width: '100%', marginRight: '1.2rem' }}
                >
                  Yes, I understand, delete anyway
                </DefaultButton>
                <SecondaryButton onClick={closeConfirmDelete}>
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      {error && <div className="error-text">{error}</div>}
    </Fragment>
  );
};

Wallet.propTypes = {
  wallet: PropTypes.object.isRequired,
  getWallets: PropTypes.func,
  getTokens: PropTypes.func
};

export default connect(null, { getWallets, getTokens })(Wallet);
