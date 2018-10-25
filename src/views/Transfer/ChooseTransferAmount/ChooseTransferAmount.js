import React from 'react';
import ChooseAmountForm from '../../../components/ChooseAmountForm';
import TruncateString from 'react-truncate-string';
import AvailableBalance from '../../../components/AvailableBalance';
import StepButton from '../../../components/Buttons/StepButton';

import './ChooseTransferAmount.scss';

const ChooseTransferAmount = ({ address, symbol, amount, handleChange, token, handleSendTransferClick }) => (
  <div className='choose-transfer-amount'>
    <div>
      <h4>Sending to</h4>
      <i className='fas fa-user' />
      <h3>
        <TruncateString text={address} />
      </h3>
    </div>
    <hr />
    <ChooseAmountForm
      amount={amount}
      symbol={symbol}
      handleChange={handleChange}
    />
    {token
      ? <AvailableBalance balance={token.balance} symbol={symbol} />
      : <AvailableBalance balance={0} symbol={symbol} />}

    <StepButton text={'Send Transfer'} onClick={handleSendTransferClick} disabled={!amount} />
  </div>
);

export default ChooseTransferAmount;
