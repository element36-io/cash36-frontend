import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import Responsive from '../../../components/Responsive';
import BackButton from '../../../components/Buttons/BackButton';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import ManualTransferIcon from '../../../assets/Buy/manual-transfer-icon.svg';
import BuyFooter from '../BuyFooter';

import './PaymentMethod.scss';

const PaymentMethod = ({
  handleManualTransferClick,
  handleAutoTransferClick,
  setStep
}) => {
  return (
    <div className="payment-method" data-testid="payment-method">
      <BackButton onClick={() => setStep(0)} />
      <Responsive isMobile>
        <h2>Payment method</h2>
      </Responsive>
      <Responsive>
        <h2>Select your payment method</h2>
      </Responsive>
      <div className="payment-method__buttons">
        <DefaultButton onClick={handleManualTransferClick}>
          <span className="payment-method__buttons--heading">
            Manual Bank Transfer
          </span>
          <span className="payment-method__buttons--icon">
            <img src={ManualTransferIcon} alt="" />
          </span>
        </DefaultButton>
        <span className="payment-method__separator">Or</span>
        <DefaultButton onClick={handleAutoTransferClick}>
          <span className="payment-method__buttons--heading">
            Automated Bank Transfer
          </span>
          <span className="payment-method__buttons--icon">
            <Responsive>
              <QRCode value="#" size={72} />
            </Responsive>
            <Responsive isMobile>
              <QRCode value="#" size={32} />
            </Responsive>
          </span>
        </DefaultButton>
      </div>
      <BuyFooter
        textline1="Buying cash36 Tokens is as simple as a bank transfer. First, choose amount and type of Token you wish to buy."
        textline2="After that you will receive the transfer instructions. Once we receive the amount, the tokens will be credited to your account."
      />
    </div>
  );
};

PaymentMethod.propTypes = {
  handleManualTransferClick: PropTypes.func,
  handleAutoTransferClick: PropTypes.func,
  setStep: PropTypes.func
};

export default PaymentMethod;
