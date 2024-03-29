import React from 'react';
import PropTypes from 'prop-types';

import StepButton from '../../../components/Buttons/StepButton';
import ChooseAmountForm from '../../../components/ChooseAmountForm';
import BuyFooter from '../BuyFooter';
import BackButton from '../../../components/Buttons/BackButton';

import './BuyTokens.scss';

const BuyTokens = ({
  handleChange,
  amount,
  symbol,
  setStep,
  handleManualTransferClick
}) => (
  <div className="buy-tokens" data-testid="buy-tokens">
    <BackButton onClick={() => setStep(0)} />
    <h2>Buy Tokens</h2>
    <ChooseAmountForm
      handleChange={handleChange}
      amount={amount}
      symbol={symbol}
    />
    <StepButton
      onClick={handleManualTransferClick}
      text={'Buy tokens'}
      disabled={!amount}
    />
    <BuyFooter
      textline1="Buying cash36 Tokens is as simple as a bank transfer. First, choose amount and type of Token you wish to buy."
      textline2="After that you will receive the transfer instructions. Once we receive the amount, the tokens will be credited to your account."
    />
  </div>
);

BuyTokens.propTypes = {
  handleChange: PropTypes.func,
  amount: PropTypes.string,
  symbol: PropTypes.string,
  setStep: PropTypes.func,
  handleManualTransferClick: PropTypes.func
};

export default BuyTokens;
