import React from 'react';
import StepButton from '../../../components/Buttons/StepButton';
import { decodeSpecialChars } from '../../../helpers/text.helpers';

import './InitiateManualPayment.scss';

// const mockData = {
//   amount: 15,
//   bankAddress: decodeSpecialChars('BÃ¶rsenstrasse 15, 8022 ZÃ¼rich'),
//   bankBic: 'XYZABC123',
//   bankCountry: 'Switzerland',
//   bankName: 'Universal Bank',
//   currency: 'CHF',
//   paymentReferenceId: '2H7OMACY1H9XFWHF07DPF',
//   receipientAddress: 'Bahnmatt 25, 6340 Baar',
//   receipientIban: 'CH123456232442342342',
//   receipientName: 'element36 AG'
// };

const InitiateManualPayment = ({ next, handleOrderSubmit, transferData }) => (
  <div className='initiate-manual-payment'>
    <h2>Initiate the payment</h2>
    <div className='initiate-manual-payment__info'>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Name</span>
        <span>{transferData.bankName}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Address</span>
        <span>{decodeSpecialChars(transferData.bankAddress)}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Receipient Name</span>
        <span>{transferData.receipientName}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Receipient Address</span>
        <span>{decodeSpecialChars(transferData.receipientAddress)}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Amount</span>
        <span>{transferData.amount}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Swift/BIC</span>
        <span>{transferData.bankBic}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Country</span>
        <span>{transferData.bankCountry}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Recipient IBAN</span>
        <span>{transferData.receipientIban}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Reference Number/Purpose</span>
        <span>{transferData.paymentReferenceId}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span className='initiate-manual-payment__message'>This must be included exactly for your transfer to work</span>
      </div>
    </div>
    <StepButton text={'Submit Order'} onClick={handleOrderSubmit} />
  </div>
);

export default InitiateManualPayment;
