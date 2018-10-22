import React from 'react';
import QRCode from 'qrcode.react';
import StepButton from '../../../components/Buttons/StepButton';

import './InitiateAutoPayment.scss';

const InitiateAutoPayment = () => (
  <div>
    <div className='initiate-auto-payment'>
      <h2>Initiate the payment</h2>
      <div className='initiate-auto-payment__qrcode'>
        <QRCode value='#' size={256} />
      </div>
      <StepButton onClick={() => console.log('clicked auto next')} text={'Next Step'} />
    </div>
  </div>
);

export default InitiateAutoPayment;
