import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TokenIcon from '../TokenIcon';
import { formatAmount } from '../../helpers/currencies.helpers';

import './BalanceCard.scss';

class BalanceCard extends Component {
  render () {
    const { symbol, name, balance } = this.props;
    return (
      <div className={`balance-card paper balance-card--${symbol}`}>
        <div>
          <Typography variant='body1' color='textSecondary'>{name} Balance</Typography>
          <MoreVertIcon className='balance-card__menu-icon' />
        </div>
        <div>
          <span className='balance-card__icon'>
            <TokenIcon token={symbol} />
          </span>
          <div className='balance-card__balance'>
            {formatAmount(balance)} <span>{symbol}</span>
          </div>
        </div>
      </div>
    );
  }
}

BalanceCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired
};

export default BalanceCard;
