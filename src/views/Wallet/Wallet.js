import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import Header from '../../components/Header';
import PageLoader from '../../components/PageLoader';
import Home from '../Home';
import Buy from '../Buy';
import Sell from '../Sell';
import Transfer from '../Transfer';
import History from '../History';
import Contacts from '../Contacts';
import Kyc from '../Kyc';

const Wallet = () => {
  const { isAuthenticated } = useSelector(
    ({ auth }) => ({
      isAuthenticated: auth.isAuthenticated
    }),
    shallowEqual
  );

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

export default Wallet;
