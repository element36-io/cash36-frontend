import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ContactMailIcon from '@material-ui/icons/ContactMail';

import BuyFooter from '../BuyFooter';

import './BuyStep0.scss';

const BuyStep0 = ({ setStep, hasWallet }) => {
  return (
    <div className="buy-step0" data-testid="buy-step0">
      <h2>Buy Tokens</h2>

      <div className="buy-step0__options">
        <div
          className={`buy-step0__option ${hasWallet ||
            'buy-step0__option--hidden'}`}
          onClick={() => {
            if (hasWallet) setStep(1);
          }}
        >
          <WalletIcon />
          <div>
            <h3>Send to your Wallet</h3>

            <p>
              The funds will be deposited to your e36 account's primary wallet.
            </p>
          </div>
        </div>

        <div className="buy-step0__option" onClick={() => setStep(2.1)}>
          <ContactMailIcon />
          <div>
            <h3>Send to Contract</h3>

            <p>
              The funds will be deposited to the contract address you specify.
            </p>
          </div>
        </div>
      </div>
      <BuyFooter
        textline1="Select the target of your Token purchase. You can either send the Tokens
        to your wallet"
        textline2="or you can send to a smart contract address you specify."
        fontSize="1.2rem"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  hasWallet: Boolean(state.wallets.walletList.length)
});

BuyStep0.propTypes = {
  hasWallet: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(BuyStep0);
