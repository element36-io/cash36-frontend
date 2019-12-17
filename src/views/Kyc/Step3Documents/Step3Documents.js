import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

import Responsive from '../../../components/Responsive';
import FormHeader from '../../../components/Form/FormHeader';
import ProcessControls from '../ProcessControls';
import FileInput from '../FileInput';
import { getSelfieCode } from '../../../store/auth/auth.actions';
import { sendUploadUrl } from '../../../helpers/async/uploadDocuments.helpers';
import idFront from '../../../assets/icons/ID Front Icon.svg';
import idBack from '../../../assets/icons/ID Back Icon.svg';
import selfie from '../../../assets/icons/Selfie Icon.svg';
import useGet from '../../../hooks/useGet';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';

import './Step3Documents.scss';

const Step3Documents = ({ changeSteps, stepError }) => {
  const [types, updateTypes] = useState({
    ID_Front: {
      documentType: 'ID_Front',
      file: null
    },
    ID_Back: {
      documentType: 'ID_Back',
      file: null
    },
    Utility_Bill: {
      documentType: 'Utility_Bill',
      file: null
    },
    ID_Selfie: {
      documentType: 'ID_Selfie',
      file: null
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = async () => {
    try {
      await sendUploadUrl();

      setEmailSent(true);

      setTimeout(() => {
        setEmailSent(false);
      }, 2000);
    } catch (error) {
      setError(error);
    }
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      let formData = new FormData();
      Object.values(types).forEach(doc => {
        if (!doc.file) return;
        formData.append('documentTypes', doc.documentType);
        formData.append('files', doc.file);
      });
      await changeSteps(3, formData, { code: selfieCode });
    } catch (error) {
      setError(error);
    }
    setSubmitting(false);
  };

  const addDocument = (file, documentType) => {
    updateTypes({
      ...types,
      [documentType]: { ...types[documentType], file }
    });
  };

  const removeDocument = documentType => {
    updateTypes({
      ...types,
      [documentType]: { ...types[documentType], file: null }
    });
  };

  const [selfieCode, selfieCodeError] = useGet(getSelfieCode, '');

  const disabled = Object.values(types)
    .filter(t => t.documentType !== 'ID_Back')
    .some(t => !t.file);

  return (
    <div className="documents-upload">
      <FormHeader
        title="Verification Process - Step 3"
        subtitle="Please upload the following documents so we can verify your identity and domicile address."
      />

      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <img src={idFront} alt="ID Front" />
          <div>
            <h3>Indentity Document Front</h3>
            <p>The Following documents are accepted:</p>
            <ul>
              <li>Passport</li>
              <li>Indentity Card</li>
            </ul>
          </div>
        </div>
        <FileInput
          documentType={types.ID_Front.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <img src={idBack} alt="ID Back" />
          <div>
            <h3>Indentity Document Back (if applicable)</h3>
            <p>
              Only applicable for documents with a back such as an ID or credit
              card format
            </p>
          </div>
        </div>
        <FileInput
          documentType={types.ID_Back.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <img src={selfie} alt="Selfie" />
          <div>
            <h3>Selfie</h3>
            <p>A selfie where you hold next to your face</p>
            <ul>
              <li>Your ID Document</li>
              <li>
                A piece of paper written "<strong>{selfieCode}</strong>" and the
                current date
              </li>
            </ul>
            <p>
              Make sure your not hidding your face nor information on the card!
            </p>
          </div>
        </div>
        <FileInput
          documentType={types.ID_Selfie.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <div>
            <h3>Verified Proof of Residence</h3>
            <p>
              Please upload the full document and blackout any sensitive
              information! The document must include your full name, your
              address and a date not older than 3 months.
            </p>
            <p>The following documents among others are accepted:</p>
            <ul>
              <li>Bank or Credit Card Statement</li>
              <li>Landline, Internet, Gas or Electricity Bill</li>
              <li>Residence Certificate</li>
            </ul>
          </div>
        </div>
        <FileInput
          documentType={types.Utility_Bill.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <Responsive>
        <div className="documents-upload__via-mobile">
          <SecondaryButton onClick={sendEmail}>
            <SmartphoneIcon />
            Upload via mobile
          </SecondaryButton>

          {emailSent && (
            <div>Link to upload via mobile has been sent to your email</div>
          )}
        </div>
      </Responsive>
      <ProcessControls
        submitLabel="Submit & Continue"
        disabled={disabled || submitting}
        submitting={submitting}
        submitCallback={onSubmit}
        error={error || stepError || selfieCodeError}
      />
    </div>
  );
};

Step3Documents.propTypes = {
  changeSteps: PropTypes.func.isRequired,
  stepError: PropTypes.string
};

export default Step3Documents;
