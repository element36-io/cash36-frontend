import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../../helpers/currencies.helpers';

import './Amount.scss';

const Amount = ({ type, amount, symbol }) => {
  return (
    <div className="activity-table-amount">
      <div>{type === 'BUY' || type === 'RECEIVED' ? '+' : '-'}{formatAmount(amount)}</div>
      <div>{symbol}</div>
    </div>
  );
};

Amount.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired
};

export default Amount;
