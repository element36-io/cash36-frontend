import React from 'react';
import PropTypes from 'prop-types';
import ChooseAmountForm from '../../../components/ChooseAmountForm';
import StepButton from '../../../components/Buttons/StepButton';
import './SellTokens.scss';

const SellTokens = props => {
  const { handleChange, amount, symbol, nextStep } = props;

  return (
    <div className='sell__sell-tokens'>
      <h2>Sell tokens</h2>
      <ChooseAmountForm handleChange={handleChange} symbol={symbol} amount={amount} />
      <div className='sell__sell-tokens__balance'>
        Available Balance: {`3.457,00 ${symbol}`}
      </div>
      <p>Exchange Fee (2%) <span>{`-${amount ? (amount * 0.02).toFixed(2) : 0}`}</span></p>
      <p>You Will Receive <span>{amount ? (amount * 0.98).toFixed(2) : 0}</span></p>
      <StepButton text='Next Step' onClick={nextStep} />
    </div>
  );
};

SellTokens.propTypes = {
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

export default SellTokens;
