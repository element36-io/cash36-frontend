import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../../components/requireAuth';
import BalanceCard from '../../components/BalanceCard';
import QuickActions from './QuickActions';
import ActivityTable from '../../components/ActivityTable';
import UserProfile from '../../components/UserProfile';
import Verification from '../../components/Verification';
import { getTokens, getUserActivity } from '../../store/tokens/tokens.actions';

import './Home.scss';

class Home extends Component {
    state = {
      showVerification: false
    };

    componentDidMount () {
      this.props.getTokens();
      this.props.getUserActivity();
    }

    toggleVerification = () => {
      this.setState({ showVerification: !this.state.showVerification });
    };

    closeVerification = () => {
      this.setState({ showVerification: false });
    };

    render () {
      const { showVerification } = this.state;
      const { user, tokens, userActivity } = this.props;

      return (
        <div className='home-page'>
          <Verification isVisible={showVerification} user={user} close={this.closeVerification} />
          <div className='home-page__user-actions'>
            <UserProfile user={user} clickCallback={this.toggleVerification} />
            <QuickActions />
          </div>
          <div className='home-page__balance-cards'>
            {tokens.map(({ symbol, name, balance }) =>
              <BalanceCard key={name} name={name} symbol={symbol} balance={balance} />)}
          </div>
          <div className='home-page__activity'>
            <h2>Last Activity</h2>
            {userActivity.length
              ? <ActivityTable userActivity={userActivity} />
              : <div className='paper home-page__no-activity'>
                <h3>No Recent Activity.</h3>
                <p>Keep track of your most recent transactions here when you sell, buy or transfer cash36 currencies</p>
              </div>
            }

          </div>
        </div>
      );
    }
}

const mapStateToProps = ({ auth: { user }, tokens: { tokens = [], userActivity = [] } }) => ({
  user,
  tokens,
  userActivity
});

export default requireAuth(connect(mapStateToProps, { getTokens, getUserActivity })(Home));
