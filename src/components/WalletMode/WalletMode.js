import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { WalletContext } from '../../providers/wallet.provider';
import { getMainWallet } from '../../helpers/wallet.helpers';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard';

import './WalletMode.scss';

const WalletMode = ({ walletList }) => {
  const hasWallet = walletList.length > 0;
  const { loggedInWallet } = useContext(WalletContext);

  if (!hasWallet) {
    return (
      <div className="walletless-mode">
        <AccountBalanceIcon />
        <div>You are now in walletless mode</div>
      </div>
    );
  }

  if (hasWallet) {
    const mainWallet = getMainWallet(walletList);
    console.log(mainWallet);

    return (
      <div
        className="wallet-login-mode"
        style={{ opacity: loggedInWallet ? 1 : 0.5 }}
        data-testid="wallet-mode"
      >
        <WalletIcon />
        <div className="wallet-login-mode__name">
          <div>{mainWallet.shortDescription}</div>
          <div>
            <CopyToClipboard
              text={mainWallet.accountAddress}
              showAsText
              truncated
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = ({ wallets: { walletList, loggedInWallet } }) => ({
  walletList,
  loggedInWallet
});

WalletMode.propTypes = {
  walletList: PropTypes.array
};

export default connect(mapStateToProps)(WalletMode);
