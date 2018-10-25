import React from 'react';
import PropTypes from 'prop-types';
import TokenIcon from '../TokenIcon';
import { formatAmount } from '../../helpers/currencies.helpers';

import './AmountCard.scss';

const AmountCard = ({ amount, symbol }) => (
  <div className={`amount-card amount-card--${symbol}`}>
    <TokenIcon token={symbol} />
    <div>
      -{formatAmount(amount)}
      <span className='amount-card__symbol'>{symbol}</span>
    </div>
  </div>
);

AmountCard.propTypes = {
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
};

export default AmountCard;
