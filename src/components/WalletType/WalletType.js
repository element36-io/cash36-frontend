import React from 'react';
import PropTypes from 'prop-types';

import ButtonBase from '../Buttons/BaseButton';
import uportLogo from '../../assets/icons/uport_logo.svg';
import metamaskLogo from '../../assets/icons/metamask.svg';

import './WalletType.scss';

const WalletType = ({ onClick }) => {
  const addUportWallet = () => onClick(1);
  const addMetaMaskWallet = () => onClick(2);

  return (
    <div className="wallet-type">
      <h3>Choose the type of wallet</h3>
      <div>
        <ButtonBase className="wallet-type__item" onClick={addUportWallet}>
          Create a wallet with uPort
          <img src={uportLogo} alt="uport logo" />
        </ButtonBase>
        <ButtonBase className="wallet-type__item" onClick={addMetaMaskWallet}>
          Create a wallet with MetaMask
          <img src={metamaskLogo} alt="uport logo" />
        </ButtonBase>
      </div>
    </div>
  );
};

WalletType.propTypes = {
  onClick: PropTypes.func
};

export default WalletType;
