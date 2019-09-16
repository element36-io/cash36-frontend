import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import PageLoader from '../../components/PageLoader';
import Home from '../Home';
import Buy from '../Buy';
import Sell from '../Sell';
import Transfer from '../Transfer';
import History from '../History';
import Contacts from '../Contacts';
import Kyc from '../Kyc';

export const Wallet = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <Fragment>
      <PageLoader />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/buy" component={Buy} />
        <Route exact path="/sell" component={Sell} />
        <Route exact path="/transfer" component={Transfer} />
        <Route exact path="/history" component={History} />
        <Route exact path="/contacts" component={Contacts} />
        <Route path="/kyc/:id" component={Kyc} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Wallet);
