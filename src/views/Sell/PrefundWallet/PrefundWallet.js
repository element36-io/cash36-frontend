import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import TokenIcon from '../../../components/TokenIcon';
import AvailableBalance from '../../../components/AvailableBalance';
import { fundWallet } from '../../../store/wallets/wallets.actions';

import './PrefundWallet.scss';

const PrefundWallet = ({ mainWallet, minFunds, tokens }) => {
  const [error, setError] = useState('');
  const { balanceCHF36, balanceEUR36 } = minFunds;

  const balances = useMemo(() => {
    return {
      EUR36: balanceEUR36,
      CHF36: balanceCHF36
    };
  }, [minFunds]);

  const [selectedSymbol, setSelectedSymbol] = useState('CHF36');

  const selectedToken = tokens.find(token => token.symbol === selectedSymbol);

  const callFundWallet = async () => {
    try {
      await fundWallet(mainWallet, selectedSymbol);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="prefund-wallet">
        <div className="prefund-wallet__content">
          <h2>Sorry, your wallet is out of gas</h2>
          <p>
            Your main wallet is out of ether. We can fund your wallet with ether
            for you, so you can make blockchain transactions. Choose which
            tokens you want to pay with.
          </p>
          <div className="prefund-wallet__currency">
            {tokens.map(({ symbol }) => {
              return (
                <div
                  key={symbol}
                  className={`prefund-wallet__currency-field paper ${
                    selectedSymbol === symbol
                      ? 'prefund-wallet__currency-field--selected'
                      : null
                  }`}
                  onClick={() => {
                    setSelectedSymbol(symbol);
                  }}
                >
                  {balances[symbol]} <span>{symbol}</span>
                  <TokenIcon symbol={symbol} />
                </div>
              );
            })}
          </div>
          <DefaultButton
            variant="contained"
            onClick={callFundWallet}
            disabled={selectedToken.balance < balances[selectedToken.symbol]}
          >
            Fund my Wallet
          </DefaultButton>
          {error && <div className="error-text">{error}</div>}
          <AvailableBalance
            balance={selectedToken.balance}
            symbol={selectedToken.symbol}
          />
          <div className="sell__footer">
            <span style={{ fontSize: '1.2rem' }}>
              The amount will be deducted from your element36 account Tokens.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

PrefundWallet.propTypes = {
  mainWallet: PropTypes.string,
  minFunds: PropTypes.object,
  tokens: PropTypes.array
};

export default PrefundWallet;
