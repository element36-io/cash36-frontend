import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../../helpers/currencies.helpers';

import './Amount.scss';

const Amount = ({ type, amount, symbol }) => {
  const renderType = () => {
    if (type === 'BUY' || type === 'RECEIVED') return '+';

    if (type === 'SELL' || type === 'SENT') return '-';

    return '';
  };
  return (
    <div className="activity-table-amount">
      <div>
        {renderType()}
        {formatAmount(amount)}
      </div>
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
