import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import API from '../../config/api';
import BuyTokens from './BuyTokens';
import { getTokens } from '../../store/tokens/tokens.actions';
import BuyStep0 from './BuyStep0';
import PaymentMethod from './PaymentMethod';
import InitiateAutoPayment from './InitiateAutoPayment';
import BackButton from '../../components/Buttons/BackButton';
import PaymentInfo from '../../components/PaymentInfo';
import TransactionFooter from '../../components/TransactionFooter';
import BuyError from './BuyError';
import useGet from '../../hooks/useGet';

import './Buy.scss';

export const Buy = ({ getTokens }) => {
  const [error, setError] = useState('');
  const [step, setStep] = useState(10);
  const [amount, setAmount] = useState('');
  const [symbol, setSymbol] = useState('EUR36');
  const [manualTransferData, setManualTransferData] = useState(null);

  useGet(getTokens, setError);

  let manualTransferStarted = false;

  const nextStep = () => {
    if (step === 0) {
      if (amount && symbol) {
        setStep(1);
      }
    }
  };

  const previousStep = () => {
    setStep(prevState => Math.round(prevState - 1));
  };

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'amount') {
      setAmount(value);
    } else if (name === 'symbol') {
      setSymbol(value);
    }
  };

  const handleManualTransferClick = async () => {
    if (manualTransferStarted) return;

    manualTransferStarted = true;

    const data = {
      amount: parseInt(amount),
      symbol: symbol
    };

    try {
      const response = await API.post('/exchange/buy', data);
      setManualTransferData(response.data);
      setStep(2.1);
    } catch (error) {
      setStep(3);
    }
  };

  const handleAutoTransferClick = () => {
    setStep(2.2);
  };

  return (
    <div className="wrapper">
      <div className="buy paper">
        {step > 0 && step !== 2.1 && <BackButton onClick={previousStep} />}
        <div className="buy__content">
          {step === 10 && <BuyStep0 />}
          {step === 0 && (
            <Fragment>
              <BuyTokens
                handleChange={handleChange}
                amount={amount}
                symbol={symbol}
                nextStep={nextStep}
              />
              <div className="error-text">{error}</div>
            </Fragment>
          )}
          {step === 1 && (
            <PaymentMethod
              next={nextStep}
              handleManualTransferClick={handleManualTransferClick}
              handleAutoTransferClick={handleAutoTransferClick}
            />
          )}
          {step === 2.1 && (
            <PaymentInfo info={manualTransferData} title="Trigger your payment">
              <div className="payment-info__message--credit">
                <p>
                  Tokens will be credited to your account as soon as the
                  transfer is complete. <br /> You can always check your order
                  status in your account history.
                </p>
              </div>
              <TransactionFooter />
            </PaymentInfo>
          )}
          {step === 2.2 && <InitiateAutoPayment next={nextStep} />}
          {step === 3 && <BuyError message="User not enabled or verified." />}
        </div>
        <div className="buy__footer">
          {step === 10 && (
            <span style={{ fontSize: '1.2rem' }}>
              Select the target of your Token purchase. You can either send the
              Tokens to your wallet
              <br />
              or you can send to a wallet address you specify.
            </span>
          )}
          {step < 2 && (
            <span style={{ fontSize: '1.2rem' }}>
              Buying cash36 Tokens is as simple as a bank transfer. First,
              choose amount and type of Token you wish to buy.
              <br />
              After that you will receive the transfer instructions. Once we
              receive the amount, the tokens will be credited to your account.
            </span>
          )}
          {step > 2 && step < 2.2 && (
            <span style={{ fontSize: '1.6rem' }}>
              Please make sure your payment will be triggered from your
              registered bank account
              {manualTransferData.userIban
                ? `: IBAN ${manualTransferData.userIban}`
                : '.'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Buy.propTypes = {
  getTokens: PropTypes.func.isRequired
};

export default connect(
  null,
  { getTokens }
)(Buy);
