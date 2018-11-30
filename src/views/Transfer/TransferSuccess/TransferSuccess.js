import React from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';
import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';
import AmountCard from '../../../components/AmountCard';

import './TransferSuccess.scss';

const TransferSuccess = props => {
  const { amount, symbol, target: { contactName, contactAddress } } = props;
  const sentTo = contactName ? <span>{contactName}</span> : <TruncateString text={contactAddress} />;

  return (
    <div className='transfer__transfer-success'>
      <ActionStatus type='success' title='Transfer Successful' />
      <AmountCard amount={amount} symbol={symbol} />
      <p>
          You've succesfuly transfered {`${amount} ${symbol}`} to {sentTo}
      </p>
      <TransactionFooter />
    </div>
  );
};

TransferSuccess.propTypes = {
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  target: PropTypes.object
};

export default TransferSuccess;
