import React from 'react';
import PropTypes from 'prop-types';

import ChooseAmountForm from '../../../components/ChooseAmountForm';
import StepButton from '../../../components/Buttons/StepButton';
import TransferFooter from '../TransferFooter';

import './TransferTokens.scss';

const TransferTokens = ({
  setStep,
  amount,
  symbol = 'EUR36',
  handleChange
}) => {
  return (
    <div className="send-tokens">
      <div className="send-tokens__header">
        <h4>Sending to</h4>
      </div>
      <hr />
      <ChooseAmountForm
        amount={amount}
        handleChange={handleChange}
        symbol={symbol}
      />
      <StepButton
        onClick={() => setStep(2)}
        text={'Next Step'}
        disabled={false}
      />
      <TransferFooter textline1="Select the amount and the currency you want to send the tokens in." />
    </div>
  );
};

TransferTokens.propTypes = {
  handleChange: PropTypes.func,
  amount: PropTypes.string,
  symbol: PropTypes.string,
  setStep: PropTypes.func
};

export default TransferTokens;
