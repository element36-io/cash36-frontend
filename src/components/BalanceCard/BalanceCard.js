import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import formatAmount from '../../helpers/formatAmount';

import './BalanceCard.scss';

class BalanceCard extends Component {
  renderCurrencySymbol = () => {
    if (this.props.symbol === 'EUR36') return <div>&#8364;</div>;
    if (this.props.symbol === 'CHF36') return <div style={{ fontWeight: 'bold' }}>&#8355;</div>;
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
          <div className={`balance-card__icon balance-card__icon--${symbol}`}>
            {this.renderCurrencySymbol()}
          </div>
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
