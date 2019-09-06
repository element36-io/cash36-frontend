import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ChooseAmountForm from '../../../components/ChooseAmountForm';
import StepButton from '../../../components/Buttons/StepButton';
import AvailableBalance from '../../../components/AvailableBalance';
import UnavailableBalance from '../../../components/UnavailableBalance';
import { formatSymbolToCurrency } from '../../../helpers/currencies.helpers';

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
}) => {
  const renderExchangeFee = () => {
    const exchangeFeeModifier = exchangeFee / 100;

    if (exchangeFee > 0) {
      return (
        <Fragment>
          <p className="exchange-fee">
            Exchange Fee ({exchangeFee}%){' '}
            <span>
              {amount ? `${-(amount * exchangeFeeModifier).toFixed(2)}` : 0}{' '}
              {formatSymbolToCurrency(symbol)}
            </span>
          </p>
          <p>
            You Will Receive{' '}
            <span>
              {amount ? (amount * (1 - exchangeFeeModifier)).toFixed(2) : 0}{' '}
              {formatSymbolToCurrency(symbol)}
            </span>
          </p>
        </Fragment>
      );
    }

    if (exchangeFee === 0) {
      return (
        <p>
          You Will Receive{' '}
          <span>
            {amount ? (amount * (1 - exchangeFeeModifier)).toFixed(2) : 0}
          </span>
        </p>
      );
    }

    return <p className="no-exchange-fee">Couldn't determine exchange fee</p>;
  };

  return (
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
      {renderExchangeFee()}
      {exchangeFeeError && (
        <div className="error-text">
          Exchange Fee error - {exchangeFeeError}
        </div>
      )}
      <StepButton
        text="Next Step"
        onClick={onClick}
        disabled={
          !amount.length || !token
            ? true
            : amount > token.balance || exchangeFee === false
        }
      />
      {tokensError && <div className="error-text">{tokensError}</div>}
    </div>
  );
};

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
