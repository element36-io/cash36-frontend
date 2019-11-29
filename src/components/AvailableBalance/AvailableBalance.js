import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../helpers/currencies.helpers';

import './AvailableBalance.scss';

const AvailableBalance = ({ balance, symbol, etherBalance }) => (
  <div className="available-balance">
    Available Balance:{' '}
    {`${formatAmount(balance)} ${symbol} ${
      etherBalance ? `(${formatAmount(etherBalance)} ether)` : ''
    }`}
  </div>
);

AvailableBalance.propTypes = {
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  etherBalance: PropTypes.number
};

export default AvailableBalance;
