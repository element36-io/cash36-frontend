import React, { Component } from 'react';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import QRCode from 'qrcode.react';
import ManualTransferIcon from '../../../assets/Buy/manual-transfer-icon.svg';

import './PaymentMethod.scss';

class PaymentMethod extends Component {
  render () {
    return (
      <div className='payment-method'>
        <h2>Select your payment method</h2>
        <div className='payment-method__buttons'>
          <DefaultButton onClick={this.props.handleManualTransferClick}>
            <span className='payment-method__buttons--heading'>Manual Bank Transfer</span>
            <span className='payment-method__buttons--icon'><img src={ManualTransferIcon} alt='' /></span>
          </DefaultButton>
          <span className='payment-method__separator'>Or</span>
          <DefaultButton onClick={this.props.handleAutoTransferClick}>
            <span className='payment-method__buttons--heading'>Automatic Bank Transfer</span>
            <span className='payment-method__buttons--icon'><QRCode value='#' size={72} /></span>
          </DefaultButton>
        </div>
      </div>
    );
  }
}

export default PaymentMethod;
