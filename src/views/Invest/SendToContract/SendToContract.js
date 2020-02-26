import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTokens } from '../../../store/tokens/tokens.actions';
import TransferAddress from '../TransferAddress';
import TransferTokens from '../TransferTokens';
import useGet from '../../../hooks/useGet';

import './SendToContract.scss';

const SendToContract = ({ getTokens }) => {
  const [step, setStep] = useState(0);
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

  const steps = [
    <TransferAddress key={0} setStep={setStep} />,
    <TransferTokens
      key={1}
      setStep={setStep}
      symbol={symbol}
      amount={amount}
      handleChange={handleChange}
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
