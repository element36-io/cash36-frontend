import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatAmount } from '../../helpers/currencies.helpers';
import euroIcon from '../../assets/BalanceCard/euro-icon.svg';
import dollarIcon from '../../assets/BalanceCard/dollar-icon.svg';
import poundIcon from '../../assets/BalanceCard/pound-icon.svg';
import francIcon from '../../assets/BalanceCard/franc-icon.svg';

import './BalanceCard.scss';

class BalanceCard extends Component {
  renderCurrencySymbol = () => {
    if (this.props.symbol === 'EUR36') return <img src={euroIcon} alt='EURO TOKEN' />;
    if (this.props.symbol === 'USD36') return <img src={dollarIcon} alt='DOLLAR TOKEN' />;
    if (this.props.symbol === 'GBP36') return <img src={poundIcon} alt='POUND TOKEN' />;
    if (this.props.symbol === 'CHF36') return <img src={francIcon} alt='FRANC TOKEN' />;
  }

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
            {this.renderCurrencySymbol()}
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
