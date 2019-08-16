import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Cash36Contract } from 'cash36-contracts';
import SellTokens from './SellTokens';
import SellConfirmation from './SellConfirmation';
import SellSuccess from './SellSuccess';
import SellError from './SellError';
import { getTokens } from '../../store/tokens/tokens.actions';
import useCash36 from '../../hooks/useCash36';
import Token from '../../contracts/ERC20Burnable';
import './Sell.scss';

console.warn(Token);

const Sell = ({ user, tokens, getTokens }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ amount: '', symbol: 'EUR36' });
  const [error, setError] = useState(null);
  const _isMounted = useRef(true);
  const cash36 = useCash36();

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
    const { tokenAddress } = tokens.filter(token => token.symbol === symbol)[0];

    // const cash36Contract = new web3.eth.Contract(
    //   Cash36Contract.abi,
    //   Cash36Contract.networks[networkId].address
    // );

    // const tokenAddress = await cash36Contract.methods
    //   .getTokenBySymbol(symbol)
    //   .call();

    console.warn(tokenAddress);
    console.warn(amount);
    console.warn(account);

    const token36Contract = new web3.eth.Contract(Token.abi, tokenAddress);

    console.warn(token36Contract);

    // Calculate amount of gas needed and add extra margin of 10%

    const burnT = await token36Contract.methods.burn(amount);
    console.warn('====== BURN', burnT);

    const estimate = await burnT.estimateGas({ from: account });
    console.warn('===== ESTIMATE', estimate);

    const data = await burnT.encodeABI();

    const options = {
      from: account,
      to: tokenAddress,
      gas: 24000,
      nonce: await web3.eth.getTransactionCount(account, 'pending'),
      data
    };

    return web3.eth
      .sendTransaction(options)
      .on('receipt', () => {
        if (_isMounted.current) setStep(2);
      })
      .on('error', () => {
        // Update with proper error message
        if (_isMounted.current) {
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
