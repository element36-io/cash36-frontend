import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import ReactCountryFlag from 'react-country-flag';

import CopyToClipboard from '../CopyToClipboard';

import './PaymentInfo.scss';

const PaymentInfo = ({ info, title, children, isModal, closeModal }) => (
  <div
    className={`payment-info ${isModal ? '__alt' : ''}`}
    data-testid="payment-info"
  >
    {isModal && (
      <CloseIcon
        data-testid="payment-info__close-icon"
        className="payment-info__close"
        onClick={closeModal}
      />
    )}
    {title && <h2 data-testid="payment-info__title">{title}</h2>}
    <div className="payment-info__content">
      <div className="payment-info__field">
        <span>Bank Name</span>
        <span>{info.bankName}</span>
      </div>
      <div className="payment-info__field">
        <span>Bank Address</span>
        <span>{info.bankAddress}</span>
      </div>
      <div className="payment-info__field">
        <span>Receipient Name</span>
        <CopyToClipboard text={info.receipientName} showAsText />
      </div>
      <div className="payment-info__field">
        <span>Receipient Address</span>
        <CopyToClipboard text={info.receipientAddress} showAsText />
      </div>
      <div className="payment-info__field">
        <span>Amount</span>
        <div className="payment-info__field--copy">
          <CopyToClipboard text={info.amount} showAsText />{' '}
          <span>{info.currency}</span>
        </div>
      </div>
      <div className="payment-info__field">
        <span>Swift/BIC</span>
        <CopyToClipboard text={info.bankBic} showAsText />
      </div>
      <div className="payment-info__field">
        <span>Bank Country</span>
        <span className="payment-info__field--country">
          <ReactCountryFlag
            code={info.bankCountryCode}
            svg
            styleProps={{
              width: '2rem',
              height: '1.3rem',
              backgroundSize: 'cover',
              marginRight: '.5rem'
            }}
          />
          <span>{info.bankCountry}</span>
        </span>
      </div>
      <div className="payment-info__field">
        <span>Recipient IBAN</span>
        <CopyToClipboard text={info.receipientIban} showAsText />
      </div>
      <div className="payment-info__field">
        <span>Reference Number/Purpose</span>
        <CopyToClipboard text={info.paymentReferenceId} showAsText />
      </div>
      <div className="payment-info__field">
        <span className="payment-info__message--warning">
          This must be included exactly for your transfer to work
        </span>
      </div>
    </div>
    {children}
  </div>
);

PaymentInfo.propTypes = {
  info: PropTypes.object,
  title: PropTypes.string,
  isModal: PropTypes.bool,
  closeModal: PropTypes.func
};

export default PaymentInfo;
