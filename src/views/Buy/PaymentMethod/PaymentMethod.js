import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Responsive from '../../../components/Responsive';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import ManualTransferIcon from '../../../assets/Buy/manual-transfer-icon.svg';

import './PaymentMethod.scss';

class PaymentMethod extends Component {
  render () {
    const { handleManualTransferClick, handleAutoTransferClick } = this.props;
    return (
      <div className="payment-method">
        <Responsive isMobile>
          <h2>Payment method</h2>
        </Responsive>
        <Responsive>
          <h2>Select your payment method</h2>
        </Responsive>
        <div className="payment-method__buttons">
          <DefaultButton onClick={handleManualTransferClick}>
            <span className="payment-method__buttons--heading">Manual Bank Transfer</span>
            <span className="payment-method__buttons--icon"><img src={ManualTransferIcon} alt="" /></span>
          </DefaultButton>
          <span className="payment-method__separator">Or</span>
          <DefaultButton onClick={handleAutoTransferClick}>
            <span className="payment-method__buttons--heading">Automated Bank Transfer</span>
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
      </div>
    );
  }
}

PaymentMethod.propTypes = {
  handleManualTransferClick: PropTypes.func,
  handleAutoTransferClick: PropTypes.func
};

export default PaymentMethod;
