import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import API from '../../../config/api';
import { getTokens } from '../../../store/tokens/tokens.actions';
import TransferAddress from '../TransferAddress';
import TransferTokens from '../TransferTokens';
import PaymentMethod from '../PaymentMethod';
import useGet from '../../../hooks/useGet';

import './SendToContract.scss';

const SendToContract = ({ getTokens }) => {
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(2);
  const [amount, setAmount] = useState('');
  const [symbol, setSymbol] = useState('EUR36');
  const tokensError = useGet(getTokens)[1];

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'amount') {
      setAmount(value);
    } else if (name === 'symbol') {
      setSymbol(value);
    }
  };

  const handleTokensTransferClick = () => {
    console.log('clicked handle tokenstransfer');
    // set step to blockchain transaction screen
    setStep(3);
  };
  const handleManualBankTransferClick = () => {
    // trigger buy for and show the end screen
    console.log('clicked handle manual');
    setStep(4);
  };

  const steps = [
    <TransferAddress
      key={0}
      setStep={setStep}
      address={address}
      setAddress={setAddress}
    />,
    <TransferTokens
      key={1}
      targetAddress={address}
      setStep={setStep}
      symbol={symbol}
      amount={amount}
      handleChange={handleChange}
    />,
    <PaymentMethod
      key={2}
      handleTokensTransferClick={handleTokensTransferClick}
      handleManualBankTransferClick={handleManualBankTransferClick}
    />
  ];

  return (
    <div className="wrapper">
      <div className="send-to-contract paper">
        <div className="send-to-contract__content">
          {tokensError ? <div>There has been an error</div> : steps[step]}
        </div>
      </div>
    </div>
  );
};

SendToContract.propTypes = {
  getTokens: PropTypes.func
};

export default connect(null, { getTokens })(SendToContract);
