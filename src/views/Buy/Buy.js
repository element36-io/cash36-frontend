import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import API from '../../config/api';
import BuyTokens from './BuyTokens';
import { getTokens } from '../../store/tokens/tokens.actions';
import { getContacts } from '../../store/contacts/contacts.actions';
import BuyStep0 from './BuyStep0';
import SendTokens from './SendTokens';
import PaymentMethod from './PaymentMethod';
import InitiateAutoPayment from './InitiateAutoPayment';
import PaymentInfo from '../../components/PaymentInfo';
import TransactionFooter from '../../components/TransactionFooter';
import BuyError from './BuyError';
import TransferAddress from './TransferAddress';
import useGet from '../../hooks/useGet';

import './Buy.scss';

export const Buy = ({ getTokens, location, contactsList, getContacts }) => {
  let [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [symbol, setSymbol] = useState('EUR36');
  const [target, setTarget] = useState(null);
  const [manualTransferData, setManualTransferData] = useState(null);
  const manualTransferStarted = useRef(false);

  const tokensError = useGet(getTokens)[1];
  const contactsError = useGet(getContacts)[1];

  if (location.state) {
    if (location.state.quickActions) setStep(2.1);

    if (location.state.quickTransfer) {
      setTarget(location.state.quickTransfer);
      setStep(2.2);
    }

    location.state = null;
  }

  const nextStep = () => {
    if (step === 1.1) {
      if (amount && symbol) {
        setStep(2);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'amount') {
      setAmount(value);
    } else if (name === 'symbol') {
      setSymbol(value);
    }
  };

  const addTarget = target => {
    setTarget(target);
    setStep(2.2);
  };

  // check data sending to buy on manual transfer
  const handleManualTransferClick = async () => {
    if (manualTransferStarted.current) return;

    manualTransferStarted.current = true;

    const data = {
      amount: parseInt(amount),
      symbol
    };
    // Recheck this when buy is working again
    if (target) {
      data.address = target.contactAddress;
    }

    try {
      const response = await API.post('/exchange/buy', data);
      setManualTransferData(response.data);
      setStep(4.1);
    } catch (error) {
      setStep(5);
    }
  };

  const handleAutoTransferClick = () => {
    setStep(4.2);
  };

  useEffect(() => {
    if (step === 0) setTarget(null);
  }, [step]);

  return (
    <div className="wrapper">
      <div className="buy paper">
        <div className="buy__content">
          {step === 0 && <BuyStep0 setStep={setStep} />}
          {step === 1 && (
            <>
              <BuyTokens
                handleChange={handleChange}
                amount={amount}
                symbol={symbol}
                setStep={setStep}
                handleManualTransferClick={handleManualTransferClick}
              />
              {(tokensError || contactsError) && (
                <div className="error-text">{tokensError || contactsError}</div>
              )}
            </>
          )}
          {step === 2.1 && (
            <>
              <TransferAddress
                contactsList={contactsList}
                submitCallback={addTarget}
                setStep={setStep}
                target={target}
              />
              {(tokensError || contactsError) && (
                <div className="error-text">{tokensError || contactsError}</div>
              )}
            </>
          )}
          {step === 2.2 && (
            <>
              <SendTokens
                symbol={symbol}
                handleChange={handleChange}
                amount={amount}
                target={target}
                setStep={setStep}
              />
              {(tokensError || contactsError) && (
                <div className="error-text">{tokensError || contactsError}</div>
              )}
            </>
          )}
          {step === 3 && (
            <PaymentMethod
              setStep={setStep}
              handleManualTransferClick={handleManualTransferClick}
              handleAutoTransferClick={handleAutoTransferClick}
            />
          )}
          {step === 4.1 && (
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
          {step === 4.2 && <InitiateAutoPayment next={nextStep} />}
          {step === 5 && <BuyError message={'User not enabled or verified.'} />}
        </div>
        <div className="buy__footer">
          {step > 4 && step < 4.2 && (
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
  getTokens: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  contactsList: PropTypes.array
};

const mapStateToProps = ({ contacts: { contactsList } }) => ({
  contactsList
});

export default connect(mapStateToProps, { getTokens, getContacts })(Buy);
