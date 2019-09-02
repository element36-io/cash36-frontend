import React from 'react';
import PropTypes from 'prop-types';

import ChooseAmountForm from '../../../components/ChooseAmountForm';
import StepButton from '../../../components/Buttons/StepButton';
import AvailableBalance from '../../../components/AvailableBalance';
import UnavailableBalance from '../../../components/UnavailableBalance';
import ExchangeFee from '../ExchangeFee';

import './SellTokens.scss';

const SellTokens = ({
  handleChange,
  amount,
  symbol,
  onClick,
  token,
  exchangeFee,
  exchangeFeeError,
  tokensError
}) => (
  <div className="sell__sell-tokens">
    <h2>Sell Tokens</h2>
    <ChooseAmountForm
      handleChange={handleChange}
      symbol={symbol}
      amount={amount}
    />
    {amount && token && token.balance < amount && <UnavailableBalance />}
    {token ? (
      <AvailableBalance balance={token.balance} symbol={symbol} />
    ) : (
      <AvailableBalance balance={0} symbol={symbol} />
    )}
    {exchangeFee && <ExchangeFee exchangeFee={exchangeFee} amount={amount} />}
    {exchangeFeeError && (
      <div className="error-text">Exchange Fee error - {exchangeFeeError}</div>
    )}
    <StepButton
      text="Next Step"
      onClick={onClick}
      disabled={!amount.length || !token ? true : amount > token.balance}
    />
    {tokensError && <div className="error-text">{tokensError}</div>}
  </div>
);

SellTokens.propTypes = {
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  token: PropTypes.object,
  tokensError: PropTypes.string,
  exchangeFeeError: PropTypes.string,
  exchangeFee: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default SellTokens;
