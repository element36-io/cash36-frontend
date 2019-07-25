import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokens } from '../../store/tokens/tokens.actions';
import BalanceCard from '../BalanceCard';
import './BalanceCards.scss';

const BalanceCards = ({ tokens, getTokens }) => {
  const [error, setError] = useState('');
  useEffect(() => {
    callGetTokens();
  }, []);

  const callGetTokens = async () => {
    try {
      await getTokens();
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return (
      <div className="balance-cards error-text">
        Fetching data error - {error}
      </div>
    );
  }

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
