import React from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import StepButton from '../../../components/Buttons/StepButton';
import { getCountryCode } from '../../../helpers/text.helpers';

import './InitiateManualPayment.scss';

const InitiateManualPayment = ({ handleOrderSubmit, transferData }) => (
  <div className='initiate-manual-payment'>
    <h2>Initiate the payment</h2>
    <div className='initiate-manual-payment__info'>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Name</span>
        <span>{transferData.bankName}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Bank Address</span>
        <span>{transferData.bankAddress}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Receipient Name</span>
        <span>{transferData.receipientName}</span>
      </div>
      <div className='initiate-manual-payment__info-field'>
        <span>Receipient Address</span>
        <span>{transferData.receipientAddress}</span>
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
        <span className='initiate-manual-payment__info-field--country'>
          <ReactCountryFlag
            code={getCountryCode(transferData.bankCountry)}
            svg
            styleProps={{
              width: '2rem',
              height: '1.3rem',
              backgroundSize: 'cover',
              marginRight: '.5rem'
            }}
          />
          <span>{transferData.bankCountry}</span>
        </span>
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

InitiateManualPayment.propTypes = {
  handleOrderSubmit: PropTypes.func,
  transferData: PropTypes.object.isRequired
};

export default InitiateManualPayment;
