import React from 'react';
import PropTypes from 'prop-types';
import StepButton from '../../../components/Buttons/StepButton';
import ChooseAmountForm from '../../../components/ChooseAmountForm';

import './BuyTokens.scss';

const BuyTokens = ({ handleChange, amount, symbol, nextStep }) => (
  <div className="buy-tokens">
    <h2>Buy Tokens</h2>
    <ChooseAmountForm
      handleChange={handleChange}
      amount={amount}
      symbol={symbol}
    />
    <StepButton onClick={nextStep} text={'Next Step'} disabled={!amount} />
  </div>
);

BuyTokens.propTypes = {
  handleChange: PropTypes.func,
  amount: PropTypes.string,
  symbol: PropTypes.string,
  nextStep: PropTypes.func
};

export default BuyTokens;
