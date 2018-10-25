import React from 'react';
import PropTypes from 'prop-types';
import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';
import TokenIcon from '../../../components/TokenIcon';
import { formatAmount } from '../../../helpers/currencies.helpers';
import './SellSuccess.scss';

const SellSuccess = props => {
  const { amount, symbol } = props;

  return (
    <div className='sell__sell-success'>
      <ActionStatus type='success' title='Success!' />
      <div className={`sell__sell-success__token sell__sell-success__token--${symbol}`}>
        <TokenIcon token={symbol} />
        <div>
          -{formatAmount(amount)}
          <span className='sell__sell-success__token__symbol'>{symbol}</span>
        </div>
      </div>
      <p>
          You've succesfuly sold {`${amount}${symbol}`}
      </p>
      <TransactionFooter />
    </div>
  );
};

SellSuccess.propTypes = {
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
};

export default SellSuccess;
