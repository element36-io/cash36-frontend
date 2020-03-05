import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import WalletProvider from '../../providers/wallet.provider';
import AvatarProvider from '../../providers/avatar.provider';

import PageLoader from '../../components/PageLoader';
import Home from '../Home';
import Buy from '../Buy';
import Sell from '../Sell';
import Use from '../Use';
import History from '../History';
import Contacts from '../Contacts';
import SendToContract from '../Use/SendToContract';
import Kyc from '../Kyc';
import { setMainWallet, getWallets } from '../../store/wallets/wallets.actions';
import { getTokens } from '../../store/tokens/tokens.actions';

export const Wallet = ({ isAuthenticated, getWallets, getTokens }) => {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async accounts => {
        try {
          await setMainWallet(accounts[0]);
          await getWallets();
          await getTokens();
        } catch (err) {
          console.log(err);
        }
      });
    }
  });
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <WalletProvider>
      <AvatarProvider>
        <PageLoader />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/sell" component={Sell} />
          <Route exact path="/use" component={Use} />
          <Route path="/use/send-to-contract" component={SendToContract} />
          <Route exact path="/history" component={History} />
          <Route exact path="/contacts" component={Contacts} />
          <Route path="/kyc/:id" component={Kyc} />
        </Switch>
      </AvatarProvider>
    </WalletProvider>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Wallet.propTypes = {
  isAuthenticated: PropTypes.bool,
  getWallets: PropTypes.func,
  getTokens: PropTypes.func,
  walletList: PropTypes.array
};

export default connect(mapStateToProps, { getTokens, getWallets })(Wallet);
