import React from 'react';
import PropTypes from 'prop-types';
import ActionStatus from '../../../components/ActionStatus';
import TransactionFooter from '../../../components/TransactionFooter';

const TransferError = ({ message }) => {
  return (
    <div className='transfer__transfer-status'>
      <ActionStatus type='error' title='Transfer Unsuccessful' />
      <p>
        {message}
      </p>
      <TransactionFooter />
    </div>
  );
};

TransferError.propTypes = {
  message: PropTypes.string.isRequired
};

export default TransferError;
