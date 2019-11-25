import React, { useContext, useMemo, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import UportLogin from '../UportLogin';
import { WalletContext, walletTypes } from '../../providers/wallet.provider';
import MmCheck from '../MmCheck';
import uportLogo from '../../assets/icons/uport_logo.svg';
import metamaskLogo from '../../assets/icons/metamask.svg';

import './WalletLogin.scss';

const WalletLogin = () => {
  const {
    onCloseDialogs,
    mainWallet,
    setLoggedInWallet,
    loggedInWallet
  } = useContext(WalletContext);
  const isMetamaskWallet = useMemo(
    () => mainWallet.walletType === walletTypes.metamask,
    [mainWallet]
  );
  const [metamaskAddress, setMetamaskAddress] = useState(null);

  const onUportSuccess = ({ address, pushToken, boxPub }) => {
    if (address === mainWallet.accountAddress) {
      setLoggedInWallet({ ...mainWallet, pushToken, boxPub });
      onCloseDialogs();
    }
  };
  const onUportError = () => {};
  const onMmCheck = account => {
    setMetamaskAddress(account);
  };

  return (
    <div className="wallet-login dialog-content">
      <CloseIcon
        className="dialog-close"
        onClick={onCloseDialogs}
        data-testid="add-wallet-dialog__close"
      />
      {mainWallet && loggedInWallet && (
        <p>You're already logged into your wallet.</p>
      )}
      {mainWallet && !loggedInWallet && (
        <>
          <img
            src={isMetamaskWallet ? metamaskLogo : uportLogo}
            alt={isMetamaskWallet ? 'MetaMask' : 'uPort'}
          />
          {isMetamaskWallet ? (
            <>
              <MmCheck onSuccess={onMmCheck} />
              {metamaskAddress &&
                metamaskAddress !== mainWallet.accountAddress && (
                  <>
                    <p>
                      Main wallet address:{' '}
                      <span>{mainWallet.accountAddress}</span>
                    </p>
                    <p>
                      MetaMask address: <span>{metamaskAddress}</span>
                    </p>
                    <p>Please select the proper MetaMask account</p>
                  </>
              )}
            </>
          ) : (
            <UportLogin
              onError={onUportError}
              onSuccess={onUportSuccess}
              type="login"
            />
          )}
        </>
      )}
    </div>
  );
};

export default WalletLogin;
