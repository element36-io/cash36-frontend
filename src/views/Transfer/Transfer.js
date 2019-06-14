import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Cash36Contract, Token36Contract } from 'cash36-contracts';
import TransferAddress from './TransferAddress';
import TransferAmount from './TransferAmount';
import BackButton from '../../components/Buttons/BackButton';
import { getTokens } from '../../store/tokens/tokens.actions';
import {
  getContacts,
  removeQuickTransfer
} from '../../store/contacts/contacts.actions';
import useCash36 from '../../hooks/useCash36';
import TransferConfirmation from './TransferConfirmation';
import TransferSuccess from './TransferSuccess';
import TransferError from './TransferError';

import './Transfer.scss';

const Transfer = ({
  quickTransfer,
  tokens,
  account,
  contactsList,
  getTokens,
  getContacts,
  removeQuickTransfer
}) => {
  const [step, setStep] = useState(quickTransfer ? 1 : 0);
  const [values, setValues] = useState({ amount: '', symbol: 'EUR36' });
  const [error, setError] = useState(null);
  const [target, setTarget] = useState(quickTransfer);
  const _isMounted = useRef(true);
  const cash36 = useCash36();

  useEffect(() => {
    getTokens();
    getContacts();
    if (quickTransfer) removeQuickTransfer();

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
    try {
      setValues({ ...amount });
      setStep(2);
      // this.setState({ step: 2, ...amount }, () => {
      //   transferTokens();
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const transferTokens = async () => {
    const { web3, networkId } = cash36;
    const {
      target: { contactAddress }
    } = target;
    const { amount, symbol } = values;

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
      .transfer(contactAddress, amount)
      .estimateGas({ from: account });
    const data = await token36Contract.methods
      .transfer(contactAddress, amount)
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
        console.log(error);
        if (_isMounted.current) {
          setError('Transfer has been denied via mobile device');
          setStep(4);
        }
      });
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
  contacts: { contactsList, quickTransfer }
}) => ({
  tokens,
  account: user.account,
  contactsList,
  quickTransfer
});

export default connect(
  mapStateToProps,
  { getTokens, getContacts, removeQuickTransfer }
)(Transfer);
