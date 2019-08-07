import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import TokenIcon from '../TokenIcon';
import { formatAmount } from '../../helpers/currencies.helpers';

import './BalanceCard.scss';

const BalanceCard = ({ symbol, name, balance }) => (
  <div className={`balance-card paper balance-card--${symbol}`}>
    <div>
      <Typography variant="body1" color="textSecondary">
        {name} Balance
      </Typography>
    </div>
    <div>
      <span className="balance-card__icon">
        <TokenIcon symbol={symbol} />
      </span>
      <div className="balance-card__balance">
        {formatAmount(balance)} <span>{symbol}</span>
      </div>
    </div>
  </div>
);

BalanceCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired
};

export default BalanceCard;
