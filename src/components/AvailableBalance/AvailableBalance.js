import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../helpers/currencies.helpers';

import './AvailableBalance.scss';

const AvailableBalance = ({ balance, symbol }) => (
  <div className="available-balance">
    Available Balance: {`${formatAmount(balance)} ${symbol}`}
  </div>
);

AvailableBalance.propTypes = {
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired
};

export default AvailableBalance;
