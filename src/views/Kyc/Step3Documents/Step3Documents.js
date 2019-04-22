import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProcessHeader from '../ProcessHeader';
import ProcessControls from '../ProcessControls';
import FileInput from '../FileInput';
import './Step3Documents.scss';

const Step3Documents = props => {
  const { changeSteps } = props;
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

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      let formData = new FormData();
      Object.keys(types).forEach(type => {
        formData.append('files', types[type].file);
        formData.append('documentTypes', types[type].documentType);
      });
      await changeSteps(3, formData);
    } catch (error) {
      console.warn(error);
      setSubmitting(false);
    }
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

  const disabled = Object.values(types).some(t => !t.file);

  return (
    <div className="documents-upload">
      <ProcessHeader
        title="Verification Process - Step 3"
        subtitle="Please upload the following documents so we can verify your identity and domicile address."
      />
      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <h3>Indentity Document Front</h3>
          <p>The Following documents are accepted:</p>
          <ul>
            <li>Passport</li>
            <li>Indentity Card</li>
          </ul>
        </div>
        <FileInput
          documentType={types.ID_Front.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <h3>Indentity Document Back (if applicable)</h3>
          <p>
            Only applicable for documents with a back such as an ID or credit
            card format
          </p>
        </div>
        <FileInput
          documentType={types.ID_Back.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <h3>Selfie</h3>
          <p>A selfie where you hold next to your face</p>
          <ul>
            <li>Your ID Document</li>
            <li>A piece of paper written "element36" and the current date</li>
          </ul>
          <p>
            Make sure your not hidding your face nor information on the card!
          </p>
        </div>
        <FileInput
          documentType={types.ID_Selfie.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <div className="documents-upload__document-wrapper">
        <div className="documents-upload__document-wrapper__content">
          <h3>Verified Proof of Residence</h3>
          <p>
            Please upload the full document and blackout any sensitive
            information! The documen must include your full name, your address
            and a date not older than 3 months.
          </p>
          <p>The following documents among others are accepted:</p>
          <ul>
            <li>Bank or Credit Card Statement</li>
            <li>Landline, Internet, Gas or Electricity Bill</li>
            <li>Residence Certificate</li>
          </ul>
        </div>
        <FileInput
          documentType={types.Utility_Bill.documentType}
          removeCallback={removeDocument}
          changeCallback={addDocument}
        />
      </div>
      <ProcessControls
        submitLabel="Submit & Continue"
        disabled={disabled || submitting}
        submitting={submitting}
        submitCallback={onSubmit}
      />
    </div>
  );
};

Step3Documents.propTypes = {
  changeSteps: PropTypes.func.isRequired
};

export default Step3Documents;
