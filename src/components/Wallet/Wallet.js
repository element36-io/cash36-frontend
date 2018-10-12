import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../requireAuth';
import BalanceCard from '../BalanceCard';
import QuickActions from '../QuickActions';
import LastActivity from '../LastActivity';
import { getTokens } from '../../store/tokens/tokens.actions';

import './Wallet.scss';

class Wallet extends Component {
  componentDidMount () {
    this.props.getTokens();
  }
  render () {
    return (
      <div>
        <div className='balance-cards'>
          {this.props.tokens.map(({ symbol, name, balance }) =>
            <BalanceCard key={name} name={name} symbol={symbol} balance={balance} />)}
        </div>

        <QuickActions />
        <LastActivity />
      </div>
    );
  }
}

const mapStateToProps = ({ tokens }) => ({ tokens });

export default requireAuth(connect(mapStateToProps, { getTokens })(Wallet));
