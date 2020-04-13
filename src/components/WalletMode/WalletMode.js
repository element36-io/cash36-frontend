import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Tooltip } from '@material-ui/core';

import ManageWalletsMenu from '../ManageWalletsMenu';
import { WalletContext } from '../../providers/wallet.provider';
import { getMainWallet } from '../../helpers/wallet.helpers';
import ZeroXAddress from '../ZeroXAddress';
import useGet from '../../hooks/useGet';
import { getServerNetworkId } from '../../store/tokens/tokens.actions';
import { parseNetworkIdToName } from '../../helpers/metamask.helpers';

import './WalletMode.scss';

const WalletMode = ({ walletList }) => {
  const hasWallet = walletList.length > 0;
  const { loggedInWallet } = useContext(WalletContext);
  const [divergedNetworks, setDivergedNetworks] = useState(false);

  console.log(loggedInWallet);

  const [serverNetworkId, serverNetworkIdError] = useGet(
    getServerNetworkId,
    '1'
  );

  useEffect(() => {
    if (window.ethereum) {
      const metamaskNetworkId = window.ethereum.networkVersion;
      if (serverNetworkIdError) return;

      if (parseInt(serverNetworkId, 10) !== parseInt(metamaskNetworkId, 10)) {
        setDivergedNetworks(true);
      } else {
        setDivergedNetworks(false);
      }
    }
  }, [serverNetworkId]);

  if (!hasWallet) {
    return (
      <div className="walletless-mode">
        <AccountBalanceIcon />
        <div>You are now in WALLET-FREE mode</div>
      </div>
    );
  }

  if (hasWallet) {
    const mainWallet = getMainWallet(walletList);

    return (
      <div
        className="wallet-login-mode"
        style={{ opacity: loggedInWallet ? 1 : 0.5 }}
        data-testid="wallet-mode"
      >
        <ManageWalletsMenu />

        <div className="wallet-login-mode__name">
          <div>{mainWallet.shortDescription}</div>
          <div
            style={{
              marginRight: '0.4rem'
            }}
          >
            <ZeroXAddress address={mainWallet.accountAddress} truncated />
          </div>
          {!loggedInWallet && (
            <Tooltip
              title={`Your Wallet (Metamask/Uport) is not logged in or different then your cash36 main wallet (${mainWallet.shortDescription}).`}
            >
              <i className="fas fa-exclamation-triangle" />
            </Tooltip>
          )}
        </div>
        {divergedNetworks &&
          !serverNetworkIdError &&
          serverNetworkId &&
          window.ethereum && (
            <div className="wallet-login-mode__diverged-network">
              <Tooltip
                title={`Web3 network is ${parseNetworkIdToName(
                  window.ethereum.networkVersion
                )}, but Server is connected to ${parseNetworkIdToName(
                  serverNetworkId
                )}`}
              >
                <i className="fas fa-exclamation-triangle" />
              </Tooltip>
            </div>
          )}
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
