import React from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';
import Avatar from '../../../components/Avatar';
import ChooseAmountForm from '../../../components/ChooseAmountForm';
import BuyFooter from '../BuyFooter';
import BackButton from '../../../components/Buttons/BackButton';
import StepButton from '../../../components/Buttons/StepButton';

import './SendTokens.scss';

const SendTokens = ({ setStep, amount, handleChange, symbol, target }) => {
  return (
    <div className="send-tokens">
      <BackButton onClick={() => setStep(2.1)} />
      <div className="send-tokens__header">
        <h4>Sending to</h4>
        <Avatar
          avatarUrl={target.avatarUrl}
          cssClass="send-tokens__avatar"
          username={target.contactAddress}
        />
        {target.contactName && <span>{target.contactName}</span>}
        <TruncateString text={target.contactAddress} />
      </div>
      <hr />
      <ChooseAmountForm
        amount={amount}
        handleChange={handleChange}
        symbol={symbol}
      />
      <StepButton
        onClick={() => setStep(3)}
        text={'Next Step'}
        disabled={!amount}
      />
      <BuyFooter textline1="Select the amount and the currency you want to send the tokens in." />
    </div>
  );
};

SendTokens.propTypes = {
  handleChange: PropTypes.func,
  amount: PropTypes.string,
  symbol: PropTypes.string,
  setStep: PropTypes.func,
  target: PropTypes.object
};

export default SendTokens;
