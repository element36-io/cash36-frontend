import React from 'react';
import TransactionFooter from '../../../components/TransactionFooter';
import ActionStatus from '../../../components/ActionStatus';
import './SellConfirmation.scss';

const SellConfirmation = () => (
  <div className='sell__sell-confirmation'>
    <ActionStatus type='progress' title='Awaiting Confirmation' />
    <p>
      Before you sell your tokens, <br />
      you need to approve the transaction on your mobile device
    </p>
    <TransactionFooter />
  </div>
);

export default SellConfirmation;
