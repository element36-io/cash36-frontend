import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bigInt from 'big-integer';

import SellTokens from './SellTokens';
import SellConfirmation from './SellConfirmation';
import SellSuccess from './SellSuccess';
import SellError from './SellError';
import { getTokens, getExchangeFee } from '../../store/tokens/tokens.actions';
import useCash36 from '../../hooks/useCash36';
import Token from '../../contracts/ERC20Burnable';

import './Sell.scss';

export const Sell = ({ user, tokens, getTokens }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ amount: '', symbol: 'EUR36' });
  const [sellError, setSellError] = useState(null);
  const [exchangeFee, setExchangeFee] = useState(null);
  const [exchangeFeeError, setExchangeFeeError] = useState('');
  const [tokensError, setTokensError] = useState('');
  const _isMounted = useRef(true);
  const cash36 = useCash36();

  const callGetExchangeFee = async () => {
    try {
      const exchangeFee = await getExchangeFee();

      setExchangeFee(exchangeFee);
    } catch (error) {
      setExchangeFeeError(error);
    }
  };

  const callGetTokens = async () => {
    try {
      await getTokens();
    } catch (error) {
      setTokensError(error);
    }
  };

  useEffect(() => {
    callGetTokens();
    callGetExchangeFee();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const confirmationStep = () => {
    setStep(1);
    burnTokens();
  };

  const catchError = error => {
    if (!_isMounted.current) return;
    setSellError(
      error.message ? error.message : 'Selling token was unsuccessful'
    );
    setStep(3);
  };

  const burnTokens = async () => {
    let { web3 } = cash36;
    const { account } = user;
    const { symbol, amount } = values;
    const { tokenAddress } = tokens.filter(token => token.symbol === symbol)[0];
    const token36Contract = new web3.eth.Contract(Token.abi, tokenAddress);

    const sellAmount = (bigInt(amount).value * bigInt('1e18').value).toString();

    try {
      const estimate = await token36Contract.methods
        .burn(sellAmount)
        .estimateGas({ from: account });
      const data = await token36Contract.methods.burn(sellAmount).encodeABI();

      const options = {
        from: account,
        to: tokenAddress,
        gas: estimate,
        nonce: await web3.eth.getTransactionCount(account, 'pending'),
        data
      };

      return web3.eth
        .sendTransaction(options)
        .on('receipt', () => {
          if (_isMounted.current) setStep(2);
        })
        .on('error', error => {
          catchError(error);
        });
    } catch (error) {
      catchError(error);
    }
  };

  const renderStep = () => {
    const { amount, symbol } = values;
    const selectedToken = tokens.filter(token => token.symbol === symbol)[0];

    switch (step) {
      case 1:
        return <SellConfirmation />;
      case 2:
        return <SellSuccess amount={amount} symbol={symbol} />;
      case 3:
        return <SellError message={sellError} />;
      default:
        return (
          <SellTokens
            amount={amount}
            symbol={symbol}
            handleChange={handleChange}
            onClick={confirmationStep}
            token={selectedToken}
            exchangeFeeError={exchangeFeeError}
            exchangeFee={exchangeFee}
            tokensError={tokensError}
          />
        );
    }
  };

  return (
    <div className="wrapper">
      <div className="sell paper">
        <div className="sell__content">{renderStep()}</div>
      </div>
    </div>
  );
};

Sell.propTypes = {
  tokens: PropTypes.array,
  getTokens: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = ({ tokens: { tokens = [] }, auth: { user } }) => ({
  tokens,
  user
});

export default connect(
  mapStateToProps,
  { getTokens }
)(Sell);
