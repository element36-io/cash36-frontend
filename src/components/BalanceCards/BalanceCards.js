import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTokens } from '../../store/tokens/tokens.actions';
import BalanceCard from '../BalanceCard';
import './BalanceCards.scss';

class BalanceCards extends Component {
  componentDidMount () {
    this.props.getTokens();
  }
  render () {
    const { tokens } = this.props;
    return (
      <div className='balance-cards'>
        {tokens.map(({ symbol, name, balance }) =>
          <BalanceCard key={name} name={name} symbol={symbol} balance={balance} />)}
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { tokens = [] } }) => ({ tokens });

export default connect(mapStateToProps, { getTokens })(BalanceCards);
