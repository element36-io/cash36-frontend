import React from 'react';
import PropTypes from 'prop-types';
import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';
import './SellSuccess.scss';
import AmountCard from '../../../components/AmountCard';

const SellSuccess = props => {
  const { amount, symbol } = props;

  return (
    <div className='sell__sell-success'>
      <ActionStatus type='success' title='Success!' />
      <AmountCard amount={amount} symbol={symbol} />
      <p>
          You've succesfuly sold {`${amount} ${symbol}`}
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
