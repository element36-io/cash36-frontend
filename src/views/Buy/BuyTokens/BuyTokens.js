import React from 'react';
import StepButton from '../../../components/Buttons/StepButton';
import ChooseAmountForm from '../../../components/ChooseAmountForm';

import './BuyTokens.scss';

const BuyTokens = ({ handleChange, amount, symbol, nextStep }) => (
  <div className='buy-tokens'>
    <h2>Buy Tokens</h2>
    <ChooseAmountForm handleChange={handleChange} amount={amount} symbol={symbol} />
    <StepButton handleClick={nextStep} text={'Next'} />
  </div>
);

export default BuyTokens;
