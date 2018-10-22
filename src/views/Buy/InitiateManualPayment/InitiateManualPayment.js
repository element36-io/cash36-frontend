import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import StepButton from '../../../components/Buttons/StepButton';
import { decodeSpecialChars, getCountryCode } from '../../../helpers/text.helpers';

import './InitiateManualPayment.scss';

const data = {
  bankName: '31135',
  bankAddress: '113414',
  receipientName: '3144134',
  receipientAddress: '13141341',
  amount: 15,
  bankBic: 315135,
  bankCountry: 'Switzerland',
  receipientIban: 13515135135,
  paymentReferenceId: '133414134'
};

const InitiateManualPayment = ({ next, handleOrderSubmit, transferData }) => (
  <div className='initiate-manual-payment'>
    <h2>Initiate the payment</h2>
    <div className='initiate-manual-payment__info'>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Name</span>
        <span>{data.bankName}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Address</span>
        <span>{decodeSpecialChars(data.bankAddress)}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Receipient Name</span>
        <span>{data.receipientName}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Receipient Address</span>
        <span>{decodeSpecialChars(data.receipientAddress)}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Amount</span>
        <span>{data.amount}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Swift/BIC</span>
        <span>{data.bankBic}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Country</span>
        <span className='initiate-manual-payment__info-field--country'>
          <ReactCountryFlag
            code={getCountryCode(data.bankCountry)}
            svg
            styleProps={{
              width: '2rem',
              height: '1.3rem',
              backgroundSize: 'cover',
              marginRight: '.5rem'
            }}
          />
          <span>{data.bankCountry}</span>
        </span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Recipient IBAN</span>
        <span>{data.receipientIban}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Reference Number/Purpose</span>
        <span>{data.paymentReferenceId}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span className='initiate-manual-payment__message'>This must be included exactly for your transfer to work</span>
      </div>
    </div>
    <StepButton text={'Submit Order'} onClick={handleOrderSubmit} />
  </div>
);

export default InitiateManualPayment;
