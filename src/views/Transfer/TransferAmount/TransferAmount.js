import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChooseAmountForm from '../../../components/ChooseAmountForm';
import Avatar from '../../../components/Avatar';
import TruncateString from 'react-truncate-string';
import AvailableBalance from '../../../components/AvailableBalance';
import UnavailableBalance from '../../../components/UnavailableBalance';
import StepButton from '../../../components/Buttons/StepButton';

import './TransferAmount.scss';

const TransferAmount = ({ target, tokens, submitCallback }) => {
  const [values, setValues] = useState({
    amount: '',
    symbol: 'EUR36'
  });

  const selectedToken = tokens.filter(
    token => token.symbol === values.symbol
  )[0];

  const handleChange = evt => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const submitAmount = () => {
    const { amount, symbol } = values;
    submitCallback({ amount, symbol });
  };

  return (
    <div className="transfer-amount">
      <div className="transfer-amount__header">
        <h4>Sending to</h4>
        <Avatar
          avatarUrl={target.avatarUrl}
          cssClass="transfer-amount__avatar"
          username={target.contactAddress}
        />
        {target.contactName && <span>{target.contactName}</span>}
        <TruncateString text={target.contactAddress} />
      </div>
      <hr />
      <ChooseAmountForm
        amount={values.amount}
        symbol={values.symbol}
        handleChange={handleChange}
      />
      {values.amount > selectedToken.balance && <UnavailableBalance />}
      <AvailableBalance
        balance={selectedToken ? selectedToken.balance : 0}
        symbol={values.symbol}
      />
      <StepButton
        text={'Send'}
        onClick={submitAmount}
        disabled={
          !selectedToken ||
          !values.amount ||
          values.amount > selectedToken.balance
        }
      />
    </div>
  );
};

TransferAmount.propTypes = {
  target: PropTypes.object.isRequired,
  submitCallback: PropTypes.func.isRequired,
  tokens: PropTypes.array.isRequired
};

export default TransferAmount;
