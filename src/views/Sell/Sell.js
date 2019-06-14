import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cash36Contract, Token36Contract } from 'cash36-contracts';
import SellTokens from './SellTokens';
import SellConfirmation from './SellConfirmation';
import SellSuccess from './SellSuccess';
import SellError from './SellError';
import { getTokens } from '../../store/tokens/tokens.actions';
import useCash36 from '../../hooks/useCash36';
import './Sell.scss';

const Sell = ({ user, tokens, getTokens }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ amount: '', symbol: 'EUR36' });
  const [error, setError] = useState(null);
  const _isMounted = useRef(true);
  const cash36 = useCash36();
  console.warn(cash36);

  useEffect(() => {
    getTokens();

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

  const burnTokens = async () => {
    let { web3, networkId } = cash36;
    const { account } = user;
    const { symbol, amount } = values;

    const cash36Contract = new web3.eth.Contract(
      Cash36Contract.abi,
      Cash36Contract.networks[networkId].address
    );

    const tokenAddress = await cash36Contract.methods
      .getTokenBySymbol(symbol)
      .call();

    const token36Contract = new web3.eth.Contract(
      Token36Contract.abi,
      tokenAddress
    );

    // Calculate amount of gas needed and add extra margin of 10%

    const estimate = await token36Contract.methods
      .burn(amount)
      .estimateGas({ from: account });

    const data = await token36Contract.methods.burn(amount).encodeABI();

    const options = {
      from: account,
      to: tokenAddress,
      gas: estimate + Math.round(estimate * 0.1),
      nonce: await web3.eth.getTransactionCount(account, 'pending'),
      data
    };

    return web3.eth
      .sendTransaction(options)
      .on('receipt', () => {
        if (_isMounted) setStep(2);
      })
      .on('error', () => {
        // Update with proper error message
        if (_isMounted) {
          setError('Selling token was unsuccessful');
          setStep(3);
        }
      });
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
        return <SellError message={error} />;
      default:
        return (
          <SellTokens
            amount={amount}
            symbol={symbol}
            handleChange={handleChange}
            onClick={confirmationStep}
            token={selectedToken}
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
