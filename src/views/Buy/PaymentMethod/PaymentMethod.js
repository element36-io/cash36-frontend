import React, { Component } from 'react';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import QRCode from 'qrcode.react';
import ManualTransferIcon from '../../../assets/Buy/manual-transfer-icon-TEMP.jpg';

import './PaymentMethod.scss';

class PaymentMethod extends Component {
  handleManualClick = () => {
    // Call Api /cash36/buy

    // Call Next step
    // Go to the Initiate payment and call API to get info
    console.log('this will be manual transfer');
  }

  handleAutoClick = () => {
    // Go to the Scan QR Code step to initiate payment
    console.log('this will be automated transfer');
  }
  render () {
    return (
      <div className='payment-method'>
        <h2>Select your payment method</h2>
        <div className='payment-method__buttons'>
          <DefaultButton
            onClick={this.handleManualClick}
          >
            <span className='payment-method__buttons--heading'>Manual Bank Transfer</span>
            <span className='payment-method__buttons--icon'><img src={ManualTransferIcon} /></span>
          </DefaultButton>
          <span className='payment-method__separator'>Or</span>
          <DefaultButton
            onClick={this.handleAutoClick}
            disabled
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
          >
            <span className='payment-method__buttons--heading'>Automatic Bank Transfer</span>
            <span className='payment-method__buttons--icon'><QRCode value='#' size={72} /></span>
          </DefaultButton>
        </div>
      </div>
    );
  }
}

export default PaymentMethod;
