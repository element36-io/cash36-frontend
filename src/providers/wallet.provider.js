import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import MobileDetect from 'mobile-detect';
import { getQueryStringValue, getMainWallet } from '../helpers/wallet.helpers';
import { verifyResponse } from '../helpers/uport.helpers';
import {
  setLoggedInWallet,
  removeLoggedInWallet
} from '../store/wallets/wallets.actions';
import NewWallet from '../components/NewWallet';
import WalletLogin from '../components/WalletLogin';
import { ResponsiveDialog } from '../components/DialogUtils/DialogUtils';

const ethereum = window.ethereum;
export const WalletContext = React.createContext();
export const walletTypes = {
  uport: 'UPORT',
  metamask: 'METAMASK'
};

const WalletProvider = ({
  children,
  mainWallet,
  loggedInWallet,
  setLoggedInWallet,
  removeLoggedInWallet
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isUportWallet, setIsUportWallet] = useState(false);
  const md = useRef(new MobileDetect(window.navigator.userAgent));
  const location = useLocation();
  const history = useHistory();

  const onCloseDialogs = () => {
    if (isUportWallet) {
      setIsUportWallet(false);
      history.replace(location.pathname);
    }
    if (isOpenAdd) setIsOpenAdd(false);
    if (isOpenLogin) setIsOpenLogin(false);
  };

  const onOpenAdd = () => setIsOpenAdd(true);

  const onOpenLogin = () => setIsOpenLogin(true);

  const checkIfUportMobile = type => {
    return (
      location.hash.includes('access_token') &&
      (type === 'wallet' || type === 'login') &&
      md.current.mobile() &&
      !md.current.tablet()
    );
  };

  const fetchUportMobileCreds = async mainWallet => {
    try {
      if (location.hash.includes('access_token')) {
        const response = await verifyResponse(location.hash.split('=')[1]);
        const { boxPub, pushToken, address } = response.data;

        if (mainWallet.accountAddress === address) { setLoggedInWallet({ ...mainWallet, pushToken, boxPub }); }

        history.replace(location.pathname);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const type = getQueryStringValue(location.search, 'type');
    if (checkIfUportMobile(type)) {
      setIsUportWallet(true);
      if (type === 'wallet') setIsOpenAdd(true);
    }
  }, []);

  useEffect(() => {
    const uportAction = getQueryStringValue(location.search, 'type');
    const metamaskAddressChangeHandler = accounts => {
      if (mainWallet && mainWallet.walletType === walletTypes.metamask) {
        mainWallet.accountAddress === accounts[0]
          ? setLoggedInWallet(mainWallet)
          : removeLoggedInWallet();
      }
    };

    if (mainWallet && mainWallet.walletType === walletTypes.uport) {
      if (
        loggedInWallet &&
        mainWallet.accountAddress !== loggedInWallet.accountAddress
      ) { removeLoggedInWallet(); }

      if (checkIfUportMobile(uportAction) && uportAction === 'login') { fetchUportMobileCreds(mainWallet); }
    }

    if (
      mainWallet &&
      mainWallet.walletType === walletTypes.metamask &&
      ethereum
    ) {
      const isSameAccount =
        ethereum.selectedAddress === mainWallet.accountAddress;

      if (!isSameAccount && loggedInWallet) removeLoggedInWallet();
      if (isSameAccount && !loggedInWallet) setLoggedInWallet(mainWallet);
    }

    if (ethereum) {
      ethereum.on('accountsChanged', metamaskAddressChangeHandler);
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener(
          'accountsChanged',
          metamaskAddressChangeHandler
        );
      }
    };
  }, [mainWallet, loggedInWallet]);

  return (
    <WalletContext.Provider
      value={{
        onCloseDialogs,
        onOpenAdd,
        onOpenLogin,
        isUportWallet,
        setIsUportWallet,
        md,
        setLoggedInWallet,
        mainWallet,
        loggedInWallet
      }}
    >
      {children}
      <ResponsiveDialog open={isOpenAdd} onClose={onCloseDialogs}>
        <NewWallet />
      </ResponsiveDialog>
      <ResponsiveDialog open={isOpenLogin} onClose={onCloseDialogs}>
        <WalletLogin />
      </ResponsiveDialog>
    </WalletContext.Provider>
  );
};

const mapStateToProps = ({ wallets: { walletList, loggedInWallet } }) => {
  return {
    mainWallet: getMainWallet(walletList),
    loggedInWallet
  };
};

WalletProvider.propTypes = {
  mainWallet: PropTypes.object,
  loggedInWallet: PropTypes.object,
  setLoggedInWallet: PropTypes.func,
  removeLoggedInWallet: PropTypes.func
};

export default connect(
  mapStateToProps,
  { setLoggedInWallet, removeLoggedInWallet }
)(WalletProvider);
