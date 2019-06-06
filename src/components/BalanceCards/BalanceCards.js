import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokens } from '../../store/tokens/tokens.actions';
import BalanceCard from '../BalanceCard';
import './BalanceCards.scss';

const BalanceCards = ({ tokens, getTokens }) => {
  useEffect(() => {
    getTokens();
  }, []);

  return (
    <div className="balance-cards">
      {tokens.map(({ symbol, name, balance }) => (
        <BalanceCard key={name} name={name} symbol={symbol} balance={balance} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ tokens: { tokens = [] } }) => ({ tokens });

BalanceCards.propTypes = {
  getTokens: PropTypes.func.isRequired,
  tokens: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  { getTokens }
)(BalanceCards);
