import React from 'react';

import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';

const SellConfirmation = () => (
  <div className="sell__sell-status">
    <ActionStatus type="progress" title="Awaiting Confirmation" />
    <p>
    The transaction is initiated -  balances will be updated as soon as the execution is confirmed
    </p>
    <TransactionFooter />
  </div>
);

export default SellConfirmation;
