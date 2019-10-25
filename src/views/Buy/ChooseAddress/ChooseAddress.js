import React from 'react';
import PropTypes from 'prop-types';

import BuyFooter from '../BuyFooter';
import BackButton from '../../../components/Buttons/BackButton';
import StepButton from '../../../components/Buttons/StepButton';

import './ChooseAddress.scss';

const ChooseAddress = ({ setStep, handleChange, address }) => {
  return (
    <div className="choose-address" data-testid="buy__choose-address">
      <BackButton onClick={() => setStep(0)} />
      <h2>Send tokens to</h2>
      <div className="choose-address__input-wrapper">
        <input
          onChange={handleChange}
          placeholder="Address"
          name="address"
          value={address}
          autoComplete="off"
        />
        <span />
      </div>
      <StepButton
        onClick={() => setStep(2.2)}
        text={'Next Step'}
        disabled={!address}
      />
      <BuyFooter
        textline1="Sending cash36 Tokens is as simple as a bank transfer. First, add address you wish to send tokens to."
        textline2="After that you will select the amount and the type of Token you wish to send."
      />
    </div>
  );
};

ChooseAddress.propTypes = {
  handleChange: PropTypes.func,
  setStep: PropTypes.func
};

export default ChooseAddress;
