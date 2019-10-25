import React from 'react';

import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ContactMailIcon from '@material-ui/icons/ContactMail';

import './BuyStep0.scss';

const BuyStep0 = () => {
  return (
    <div className="buy-step0">
      <h2>Buy Tokens</h2>

      <div className="buy-step0__options">
        <div className="buy-step0__option">
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
    </div>
  );
};

export default BuyStep0;
