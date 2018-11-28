import React from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';
import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';

const TransferConfirmation = props => {
  const { target: { contactAddress, contactName } } = props;

  return (
    <div className='transfer__transfer-status'>
      <ActionStatus type='progress' title='Awaiting Confirmation' />
      <p>
        Before we transfer your money to <span>{contactName || <TruncateString text={contactAddress} />}</span>
        you need to approve the transaction on your mobile device.
      </p>
      <TransactionFooter />
    </div>
  );
};

TransferConfirmation.propTypes = {
  target: PropTypes.object.isRequired
};

export default TransferConfirmation;
