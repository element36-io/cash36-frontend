import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  formatSymbolToCurrency,
  parseAmount
} from '../../../helpers/currencies.helpers';

const ExchangeFee = ({ exchangeFee, amount, symbol, isSell }) => {
  const parsedAmount = parseAmount(amount);
  const exchangeFeeModifier = exchangeFee / 100;
  const showAmountReceivedMessage = useCallback(
    () =>
      isSell ? 'Amount that will be sent to your account' : 'You Will Receive',
    []
  );

  if (exchangeFee > 0) {
    return (
      <>
        <p className="exchange-fee">
          Exchange Fee ({exchangeFee}%){' '}
          <span>
            {amount ? `${-(parsedAmount * exchangeFeeModifier).toFixed(2)}` : 0}{' '}
            {formatSymbolToCurrency(symbol)}
          </span>
        </p>
        <p>
          {showAmountReceivedMessage()}
          <span>
            {amount ? (parsedAmount * (1 - exchangeFeeModifier)).toFixed(2) : 0}{' '}
            {formatSymbolToCurrency(symbol)}
          </span>
        </p>
      </>
    );
  }

  if (exchangeFee === 0) {
    return (
      <p>
        {showAmountReceivedMessage()}
        <span>
          {amount ? (amount * (1 - exchangeFeeModifier)).toFixed(2) : 0}
        </span>
      </p>
    );
  }

  if (exchangeFee === false) {
    return <p className="no-exchange-fee">Couldn't determine exchange fee</p>;
  }

  return null;
};

ExchangeFee.propTypes = {
  exchangeFee: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  amount: PropTypes.string,
  symbol: PropTypes.string,
  isSell: PropTypes.bool
};

export default ExchangeFee;
