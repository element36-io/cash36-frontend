import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { Web3Context } from '../../providers/web3.provider';
import { getMainWalletAddress } from '../../helpers/wallet.helpers';
import noWalletIcon from '../../assets/icons/wallet-offline-new.svg';

import './WalletMode.scss';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard';

const WalletMode = ({ walletList }) => {
  const hasWallet = walletList.length > 0;
  const { eth } = useContext(Web3Context);
  const [isLoggedInMetamask, setIsLoggedInMetamask] = useState(false);

  if (!hasWallet) {
    return (
      <div className="walletless-mode">
        <img src={noWalletIcon} alt="" />
        <div>You are now in walletless mode</div>
      </div>
    );
  }

  const checkIfLoggedInMetamask = async mainWallet => {
    try {
      const accounts = await eth.getAccounts();

      if (accounts[0].toLowerCase() === mainWallet.toLowerCase()) {
        setIsLoggedInMetamask(true);
      } else {
        setIsLoggedInMetamask(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (hasWallet) {
    const mainWallet = getMainWalletAddress(walletList);

    checkIfLoggedInMetamask(mainWallet);

    return (
      <div
        className="wallet-login-mode"
        style={{ opacity: isLoggedInMetamask ? 1 : 0.5 }}
        data-testid="wallet-mode"
      >
        <WalletIcon />
        <div>
          <CopyToClipboard text={mainWallet} showAsText />
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = state => ({
  walletList: state.wallets.walletList
});

export default connect(mapStateToProps)(WalletMode);
