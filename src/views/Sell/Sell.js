import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SellTokens from './SellTokens';
import SellConfirmation from './SellConfirmation';
import SellSuccess from './SellSuccess';
import SellError from './SellError';
import PrefundWallet from './PrefundWallet';
import { getTokens, getExchangeFee } from '../../store/tokens/tokens.actions';
import { getMinFunds } from '../../store/wallets/wallets.actions';
import useCash36 from '../../hooks/useCash36';
import { Token36Contract } from '@element36-io/cash36-contracts';
import useGet from '../../hooks/useGet';
import useGetEtherBalance from '../../hooks/useGetEtherBalance';
import { getMainWalletAddress } from '../../helpers/wallet.helpers';

import './Sell.scss';

export const Sell = ({ tokens, getTokens, hasWallet, mainWallet }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ amount: '', symbol: 'EUR36' });
  const [sellError, setSellError] = useState(null);
  const mounted = useRef(true);
  const web3 = useCash36();

  console.log(mainWallet);

  const tokensError = useGet(getTokens)[1];
  const [exchangeFee, exchangeFeeError] = useGet(getExchangeFee, null);
  const [minFunds, minFundsError] = useGet(getMinFunds);

  const balanceWei = useGetEtherBalance(mainWallet, 'wei');
  const etherBalance = useGetEtherBalance(mainWallet);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  if (!hasWallet) return <Redirect to="/" />;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const confirmationStep = () => {
    if (balanceWei < minFunds.balanceWei) {
      setStep(4);
    }

    setStep(1);
    burnTokens();
  };

  const catchError = error => {
    if (!mounted.current) return;
    setSellError(
      error.message ? error.message : 'Selling token was unsuccessful'
    );
    setStep(3);
  };

  const burnTokens = async () => {
    console.warn('this was called');

    const { symbol, amount } = values;
    const { tokenAddress } = tokens.filter(token => token.symbol === symbol)[0];
    const token36Contract = new web3.eth.Contract(
      Token36Contract.abi,
      tokenAddress
    );

    const sellAmount = web3.utils.toWei(amount, 'ether');

    console.log(token36Contract.methods);

    try {
      const estimate = await token36Contract.methods
        .burn(sellAmount)
        .estimateGas({ from: mainWallet });

      const data = await token36Contract.methods.burn(sellAmount).encodeABI();

      const options = {
        from: mainWallet,
        to: tokenAddress,
        gas: estimate + Math.round(estimate * 0.1),
        nonce: await web3.eth.getTransactionCount(mainWallet, 'pending'),
        data
      };

      return web3.eth
        .sendTransaction(options)
        .on('receipt', () => {
          if (mounted.current) setStep(2);
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
      case 4:
        return (
          <PrefundWallet
            mainWallet={mainWallet}
            minFunds={minFunds}
            tokens={tokens}
          />
        );
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
            minFundsError={minFundsError}
            etherBalance={etherBalance}
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
  user: PropTypes.object,
  hasWallet: PropTypes.bool,
  mainWallet: PropTypes.string
};

const mapStateToProps = ({
  tokens: { tokens = [] },
  auth: { user },
  wallets
}) => ({
  tokens,
  user,
  hasWallet: Boolean(wallets.walletList.length),
  mainWallet: getMainWalletAddress(wallets.walletList)
});

export default connect(mapStateToProps, { getTokens })(Sell);
