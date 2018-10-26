import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../../helpers/currencies.helpers';

import './Amount.scss';

const renderAction = (type, amount) => {
  if (type === 'BUY' || type === 'RECEIVED') return `+${formatAmount(amount)}`;
  if (type === 'SELL' || type === 'SENT') return `-${formatAmount(amount)}`;
};

const Amount = ({ type, amount, symbol }) => {
  return (
    <div className='activity-table-amount'>
      <div>{renderAction(type, amount)}</div>
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
