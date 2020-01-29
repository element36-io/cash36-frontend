import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import useCash36 from '../../../hooks/useCash36';

import './InitiateTokensTransfer.scss';

const InitiateTokensTransfer = () => {
  const web3 = useCash36();

  console.log(web3);
  const [checkingSender, setCheckingSender] = useState(true);
  const [checkingReceiver, setCheckingReceiver] = useState(true);

  const verifyKyc = () => {
    setCheckingSender(true);
    setCheckingReceiver(true);

    // Blockchain code for checking

    setCheckingSender(false);
    setCheckingReceiver(false);
  };

  useEffect(() => {
    verifyKyc('sender');
    verifyKyc('receiver');
  }, []);

  return (
    <div>
      <div className="initiate-tokens-transfer">
        <h2>Initiate Tokens Transfer</h2>
        <div className="initiate-tokens-transfer__kyc-verifications">
          <div className="initiate-tokens-transfer__kyc-verification">
            <h4>{checkingSender ? 'Verifying KYC for Sender...' : 'Sender'}</h4>
            {checkingSender && <CircularProgress color="primary" size={15} />}
          </div>
          <div className="initiate-tokens-transfer__kyc-verification">
            <h4>
              {checkingSender ? 'Verifying KYC for Receiver...' : 'Receiver'}
            </h4>
            {checkingReceiver && <CircularProgress color="primary" size={15} />}
          </div>
        </div>

        {(!checkingSender || !checkingReceiver) && (
          <div className="initiate-tokens-transfer__buttons">
            <DefaultButton>Execute Order 66</DefaultButton>
            <SecondaryButton>Cancel</SecondaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitiateTokensTransfer;
