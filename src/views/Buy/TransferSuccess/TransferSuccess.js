import React from 'react';
import PropTypes from 'prop-types';

import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';
import AmountCard from '../../../components/AmountCard';

import './TransferSuccess.scss';

const TransferSuccess = ({ amount, symbol }) => (
  <div className="transfer__transfer-success">
    <ActionStatus type="success" title="Success!" />
    <AmountCard amount={amount} symbol={symbol} />
    <p>You've succesfuly transfered {`${amount} ${symbol}`}</p>
    <TransactionFooter />
  </div>
);

TransferSuccess.propTypes = {
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
};

export default TransferSuccess;
