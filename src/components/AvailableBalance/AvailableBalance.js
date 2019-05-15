import React from 'react';
import { formatAmount } from '../../helpers/currencies.helpers';

import './AvailableBalance.scss';

const AvailableBalance = ({ balance, symbol }) => (
  <div className="available-balance">
    Available Balance: {`${formatAmount(balance)} ${symbol}`}
  </div>
);

export default AvailableBalance;
