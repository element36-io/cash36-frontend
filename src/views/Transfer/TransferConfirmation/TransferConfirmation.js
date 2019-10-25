import React from 'react';

import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';

const TransferConfirmation = () => (
  <div className="transfer__transfer-status">
    <ActionStatus type="progress" title="Awaiting Confirmation" />
    <div>
      The transaction is initiated - balances will be updated as soon as the
      execution is confirmed
    </div>
    <TransactionFooter />
  </div>
);

export default TransferConfirmation;
