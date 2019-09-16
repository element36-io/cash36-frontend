import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatSymbolToCurrency } from '../../../helpers/currencies.helpers';

const ExchangeFee = ({ exchangeFee, amount, symbol }) => {
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

  if (exchangeFee === false) {
    return <p className="no-exchange-fee">Couldn't determine exchange fee</p>;
  }

  return null;
};

ExchangeFee.propTypes = {
  exchangeFee: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  amount: PropTypes.string,
  symbol: PropTypes.string
};

export default ExchangeFee;
