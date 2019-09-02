import React from 'react';
import PropTypes from 'prop-types';

const ExchangeFee = ({ amount, exchangeFee }) => {
  const exchangeFeeModifier = exchangeFee / 100;

  return (
    <div className="exchange-fee">
      <p>
        Exchange Fee ({exchangeFee}%){' '}
        <span>
          {amount ? `${-(amount * exchangeFeeModifier).toFixed(2)}` : 0}
        </span>
      </p>
      <p>
        You Will Receive{' '}
        <span>
          {amount ? (amount * (1 - exchangeFeeModifier)).toFixed(2) : 0}
        </span>
      </p>
    </div>
  );
};

ExchangeFee.propTypes = {
  amount: PropTypes.string.isRequired,
  exchangeFee: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ExchangeFee;
