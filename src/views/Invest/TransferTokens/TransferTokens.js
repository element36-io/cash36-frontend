import React from 'react';
import PropTypes from 'prop-types';

import ChooseAmountForm from '../../../components/ChooseAmountForm';
import BackButton from '../../../components/Buttons/BackButton';
import StepButton from '../../../components/Buttons/StepButton';
import TransferFooter from '../TransferFooter';
import Responsive from '../../../components/Responsive';
import { truncateBlockchainAddress } from '../../../helpers/string.helpers';
import contractIcon from '../../../assets/icons/contract-icon.svg';

import './TransferTokens.scss';

const TransferTokens = ({
  targetAddress,
  setStep,
  amount,
  symbol = 'EUR36',
  handleChange
}) => {
  return (
    <div className="invest-transfer-tokens">
      <BackButton onClick={() => setStep(0)} />
      <div className="invest-transfer-tokens__header">
        <h4>Sending to</h4>
        <img src={contractIcon} alt="" />
        <Responsive>{targetAddress}</Responsive>
        <Responsive isMobile>
          {truncateBlockchainAddress(targetAddress)}
        </Responsive>
      </div>
      <hr />
      <ChooseAmountForm
        amount={amount}
        handleChange={handleChange}
        symbol={symbol}
      />
      <StepButton
        onClick={() => setStep(2)}
        text={'Next Step'}
        disabled={false}
      />
      <TransferFooter textline1="Select the amount and the currency you want to send the tokens in." />
    </div>
  );
};

TransferTokens.propTypes = {
  targetAddress: PropTypes.string,
  handleChange: PropTypes.func,
  amount: PropTypes.string,
  symbol: PropTypes.string,
  setStep: PropTypes.func
};

export default TransferTokens;
