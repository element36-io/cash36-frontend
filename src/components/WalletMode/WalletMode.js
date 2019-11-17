import React, { useContext } from 'react';
import { connect } from 'react-redux';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { WalletContext } from '../../providers/wallet.provider';
import { getMainWalletAddress } from '../../helpers/wallet.helpers';
import noWalletIcon from '../../assets/icons/wallet-offline-new.svg';

import './WalletMode.scss';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard';

const WalletMode = ({ walletList }) => {
  const hasWallet = walletList.length > 0;
  const { loggedInWallet } = useContext(WalletContext);

  if (!hasWallet) {
    return (
      <div className="walletless-mode">
        <img src={noWalletIcon} alt="" />
        <div>You are now in walletless mode</div>
      </div>
    );
  }

  if (hasWallet) {
    const mainWallet = getMainWalletAddress(walletList);

    return (
      <div
        className="wallet-login-mode"
        style={{ opacity: loggedInWallet ? 1 : 0.5 }}
        data-testid="wallet-mode"
      >
        <WalletIcon />
        <CopyToClipboard text={mainWallet} showAsText />
      </div>
    );
  }

  return null;
};

const mapStateToProps = ({ wallets: { walletList, loggedInWallet } }) => ({
  walletList,
  loggedInWallet
});

export default connect(mapStateToProps)(WalletMode);
