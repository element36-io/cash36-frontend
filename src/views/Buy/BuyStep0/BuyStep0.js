import React from 'react';

import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ContactMailIcon from '@material-ui/icons/ContactMail';

import BuyFooter from '../BuyFooter';

import './BuyStep0.scss';

const BuyStep0 = ({ setStep }) => {
  return (
    <div className="buy-step0">
      <h2>Buy Tokens</h2>

      <div className="buy-step0__options">
        <div className="buy-step0__option" onClick={() => setStep(1.1)}>
          <div>
            <WalletIcon />
            <h3>Send to your Wallet</h3>
          </div>
          <p>The funds will be deposited to your e36 account.</p>
        </div>
        <div className="buy-step0__option">
          <div>
            <ContactMailIcon />
            <h3>Send to an address</h3>
          </div>
          <p>The funds will be deposited to the address you specify.</p>
        </div>
      </div>
      <BuyFooter
        textline1="Select the target of your Token purchase. You can either send the Tokens
        to your wallet"
        textline2="or you can send to a wallet address you specify."
        fontSize="1.2rem"
      />
    </div>
  );
};

export default BuyStep0;
