import React from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';
import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';

const TransferConfirmation = ({ address }) => (
  <div className='transfer__transfer-status'>
    <ActionStatus type='progress' title='Awaiting Confirmation' />
    <p>
      Before we transfer your money to <TruncateString text={address} />
      you need to approve the transaction on your mobile device.
    </p>
    <TransactionFooter />
  </div>
);

TransferConfirmation.propTypes = {
  address: PropTypes.string.isRequired
};

export default TransferConfirmation;
