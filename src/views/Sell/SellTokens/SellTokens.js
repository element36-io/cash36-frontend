import React from 'react';
import PropTypes from 'prop-types';

import ChooseAmountForm from '../../../components/ChooseAmountForm';
import StepButton from '../../../components/Buttons/StepButton';
import AvailableBalance from '../../../components/AvailableBalance';
import UnavailableBalance from '../../../components/UnavailableBalance';
import { parseAmount } from '../../../helpers/currencies.helpers';
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
  tokensError,
  minFundsError,
  etherBalance
}) => {
  return (
    <div className="sell__sell-tokens">
      <h2>Sell Tokens</h2>
      <ChooseAmountForm
        handleChange={handleChange}
        symbol={symbol}
        amount={amount}
      />
      {amount && token && token.balance < parseAmount(amount) && (
        <UnavailableBalance />
      )}
      {token ? (
        <AvailableBalance symbol={symbol} etherBalance={etherBalance} />
      ) : (
        <AvailableBalance symbol={symbol} etherBalance={etherBalance} />
      )}
      {exchangeFee && (
        <ExchangeFee
          amount={amount}
          exchangeFee={exchangeFee}
          symbol={symbol}
          isSell
        />
      )}
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
            : parseAmount(amount) > token.balance || exchangeFee === false
        }
      />
      {tokensError && <div className="error-text">{tokensError}</div>}
      {minFundsError && <div className="error-text">{minFundsError}</div>}
      <div className="sell__footer">
        <span style={{ fontSize: '1.2rem' }}>
          If your bank account is using a different currency, the exchange rates
          of{' '}
          <a
            href="https://www.hbl.ch/de/private/zahlen/reisen/waehrungsrechner/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hypo Lenzburg
          </a>{' '}
          apply.
        </span>
      </div>
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
  exchangeFee: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string
  ]),
  etherBalance: PropTypes.number,
  minFundsError: PropTypes.string
};

export default SellTokens;
