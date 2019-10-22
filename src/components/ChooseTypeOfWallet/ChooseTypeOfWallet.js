import React from 'react';

import uportLogo from '../../assets/icons/uport_logo.svg';
import metamaskLogo from '../../assets/icons/metamask.svg';

import './ChooseTypeOfWallet.scss';

const ChooseTypeOfWallet = () => {
  return (
    <div className="choose-type-of-wallet">
      <h3>Choose the type of wallet</h3>
      <div>
        <div className="choose-type-of-wallet__type">
          Create a wallet with uPort
          <img src={uportLogo} alt="uport logo" />
        </div>
        <div className="choose-type-of-wallet__type">
          Create a wallet with MetaMask
          <img src={metamaskLogo} alt="uport logo" />
        </div>
      </div>
    </div>
  );
};

export default ChooseTypeOfWallet;
