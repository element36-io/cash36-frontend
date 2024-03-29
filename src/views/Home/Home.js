import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuickActions from './QuickActions';
import ActivityTable from '../../components/ActivityTable';
import UserProfile from '../../components/UserProfile';
import { getUserActivity } from '../../store/tokens/tokens.actions';
import BalanceCards from '../../components/BalanceCards';
import useGet from '../../hooks/useGet';
import { getContracts } from '../../helpers/async/contracts.helpers';
import { getContractsAction } from '../../store/contracts/contracts.actions';
import { getContacts } from '../../store/contacts/contacts.actions';

import './Home.scss';

const Home = ({
  getUserActivity,
  userActivity,
  getContractsAction,
  getContacts
}) => {
  const lastActivity = userActivity.slice(0, 5);

  const lastActivityError = useGet(getUserActivity)[1];
  const [contracts] = useGet(getContracts, []);

  useEffect(() => {
    getContractsAction(contracts);
  }, [contracts]);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="home-page" data-testid="home-page">
      <div className="wrapper">
        <div className="home-page__user-actions">
          <UserProfile />
          <QuickActions />
        </div>
        <div className="home-page__balance-cards">
          <BalanceCards />
        </div>
        <div className="home-page__activity">
          <h2>Last Activity</h2>
          {userActivity.length ? (
            <ActivityTable userActivity={lastActivity} />
          ) : (
            <div className="paper home-page__no-activity">
              {lastActivityError ? (
                <div className="error-text">{lastActivityError}</div>
              ) : (
                <Fragment>
                  <h3>No Recent Activity.</h3>
                  <p>
                    Keep track of your most recent transactions here when you
                    sell, buy or transfer cash36 currencies
                  </p>
                </Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ tokens: { userActivity = [] } }) => ({
  userActivity
});

Home.propTypes = {
  getUserActivity: PropTypes.func,
  userActivity: PropTypes.array,
  getContractsAction: PropTypes.func,
  getContacts: PropTypes.func
};

export default connect(mapStateToProps, {
  getUserActivity,
  getContractsAction,
  getContacts
})(Home);
