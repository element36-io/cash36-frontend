import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import QuickActions from './QuickActions';
import ActivityTable from '../../components/ActivityTable';
import UserProfile from '../../components/UserProfile';
import { getUserActivity } from '../../store/tokens/tokens.actions';
import BalanceCards from '../../components/BalanceCards';

import './Home.scss';

const Home = ({ getUserActivity, userActivity }) => {
  const lastActivity = userActivity.slice(0, 5);

  useEffect(() => {
    getUserActivity();
  }, []);

  return (
    <div className="home-page">
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
              <h3>No Recent Activity.</h3>
              <p>
                Keep track of your most recent transactions here when you sell,
                buy or transfer cash36 currencies
              </p>
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

export default connect(
  mapStateToProps,
  { getUserActivity }
)(Home);
