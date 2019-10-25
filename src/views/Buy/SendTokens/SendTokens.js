import React from 'react';
import PropTypes from 'prop-types';

import ChooseAmountForm from '../../../components/ChooseAmountForm';
import BuyFooter from '../BuyFooter';
import BackButton from '../../../components/Buttons/BackButton';
import StepButton from '../../../components/Buttons/StepButton';

import './SendTokens.scss';

const SendTokens = ({ setStep, amount, handleChange, symbol }) => {
  return (
    <div className="send-tokens">
      <BackButton onClick={() => setStep(2.1)} />
      <h2>Send Tokens</h2>

      <ChooseAmountForm
        amount={amount}
        handleChange={handleChange}
        symbol={symbol}
      />
      <StepButton
        onClick={() => setStep(3)}
        text={'Next Step'}
        disabled={!amount}
      />
      <BuyFooter textline1="Select the amount and the currency you want to send the tokens in." />
    </div>
  );
};

SendTokens.propTypes = {
  handleChange: PropTypes.func,
  amount: PropTypes.string,
  symbol: PropTypes.string,
  setStep: PropTypes.func
};

export default SendTokens;
