import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import bigInt from 'big-integer';

import TransferAddress from './TransferAddress';
import TransferAmount from './TransferAmount';
import BackButton from '../../components/Buttons/BackButton';
import { getTokens } from '../../store/tokens/tokens.actions';
import { getContacts } from '../../store/contacts/contacts.actions';
import useCash36 from '../../hooks/useCash36';
import Token from '../../contracts/ERC20Burnable';
import TransferConfirmation from './TransferConfirmation';
import TransferSuccess from './TransferSuccess';
import TransferError from './TransferError';

import './Transfer.scss';

const Transfer = ({
  tokens,
  account,
  contactsList,
  getTokens,
  getContacts,
  location,
  history
}) => {
  const [step, setStep] = useState(
    location.state && location.state.quickTransfer ? 1 : 0
  );
  const [values, setValues] = useState({ amount: '', symbol: 'EUR36' });
  const [error, setError] = useState(null);
  const [target, setTarget] = useState(
    (location.state && location.state.quickTransfer) || null
  );
  const _isMounted = useRef(true);
  const cash36 = useCash36();

  useEffect(() => {
    getTokens();
    getContacts();

    if (location.state) {
      history.replace({
        pathname: '/transfer',
        state: null
      });
    }

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const addTarget = target => {
    setTarget(target);
    nextStep();
  };

  const sendTransfer = amount => {
    setValues({ ...amount });
    setStep(2);
    transferTokens(amount);
  };

  const catchError = error => {
    if (!_isMounted.current) return;
    setError(
      error.message
        ? error.message
        : 'Transfer has been denied via mobile device'
    );
    setStep(4);
  };

  const transferTokens = async transferValues => {
    const { web3 } = cash36;
    const { contactAddress } = target;
    const { amount, symbol } = transferValues;
    const { tokenAddress } = tokens.filter(token => token.symbol === symbol)[0];
    const token36Contract = new web3.eth.Contract(Token.abi, tokenAddress);

    const transferAmount = (
      bigInt(amount).value * bigInt('1e18').value
    ).toString();

    try {
      const estimate = await token36Contract.methods
        .transfer(contactAddress, transferAmount)
        .estimateGas({ from: account });
      const data = await token36Contract.methods
        .transfer(contactAddress, transferAmount)
        .encodeABI();

      const options = {
        from: account,
        to: tokenAddress,
        gas: estimate + Math.round(estimate * 0.1),
        nonce: await web3.eth.getTransactionCount(account, 'pending'),
        data
      };

      return web3.eth
        .sendTransaction(options)
        .once('transactionHash', hash => {
          if (_isMounted.current) setStep(3);
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
    const {
      web3: { utils }
    } = cash36;

    switch (step) {
      case 1:
        return (
          <TransferAmount
            submitCallback={sendTransfer}
            target={target}
            tokens={tokens}
          />
        );
      case 2:
        return <TransferConfirmation target={target} />;
      case 3:
        return (
          <TransferSuccess amount={amount} target={target} symbol={symbol} />
        );
      case 4:
        return <TransferError message={error} />;
      default:
        return (
          <TransferAddress
            submitCallback={addTarget}
            contactsList={contactsList}
            utils={utils}
          />
        );
    }
  };

  return (
    <div className="wrapper">
      <div className="transfer paper">
        <div className="transfer__content">
          {step === 1 && <BackButton onClick={previousStep} />}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  tokens: { tokens = [] },
  auth: { user },
  contacts: { contactsList }
}) => ({
  tokens,
  account: user.account,
  contactsList
});

export default connect(
  mapStateToProps,
  { getTokens, getContacts }
)(Transfer);
