import React from 'react';
import PropTypes from 'prop-types';

import ChooseAmountForm from '../../../components/ChooseAmountForm';
import BackButton from '../../../components/Buttons/BackButton';
import AvailableBalance from '../../../components/AvailableBalance';
import StepButton from '../../../components/Buttons/StepButton';
import TransferFooter from '../TransferFooter';
import Responsive from '../../../components/Responsive';
import contractIcon from '../../../assets/icons/contract-icon.svg';
import ZeroXAddress from '../../../components/ZeroXAddress';

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
        <Responsive>
          <ZeroXAddress address={targetAddress} />
        </Responsive>
        <Responsive isMobile>
          <ZeroXAddress address={targetAddress} truncated />
        </Responsive>
      </div>
      <hr />
      <ChooseAmountForm
        amount={amount}
        handleChange={handleChange}
        symbol={symbol}
      />
      <AvailableBalance symbol={symbol} etherBalance={''} />
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
  setStep: PropTypes.func,
  tokens: PropTypes.array
};

export default TransferTokens;
