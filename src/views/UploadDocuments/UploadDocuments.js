import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import FileInput from '../../views/Kyc/FileInput';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Logo from '../../components/Logo';
import { uploadDocumentsViaMobile } from '../../helpers/async/uploadDocuments.helpers';
import { getQueryStringValue } from '../../helpers/wallet.helpers';

import './UploadDocuments.scss';

const UploadDocuments = () => {
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
  const [error, setError] = useState('');
  const location = useLocation();
  const code = getQueryStringValue(location.search, 'code');
  const selfieCode = getQueryStringValue(location.search, 'selfieCode');

  const onSubmit = async () => {
    if (!code) setError('Unauthorized');
    try {
      setError('');
      setSubmitting(true);
      let formData = new FormData();
      Object.values(types).forEach(doc => {
        if (!doc.file) return;
        formData.append('documentTypes', doc.documentType);
        formData.append('files', doc.file);
      });

      await uploadDocumentsViaMobile(formData, code);
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

  const disabled = Object.values(types)
    .filter(t => t.documentType !== 'ID_Back')
    .some(t => !t.file);

  return (
    <div className="upload-documents-view">
      <div className="upload-documents-view__header">
        <Logo />
      </div>
      <h1>Upload Documents</h1>
      <div className="upload-documents__form">
        <div className="upload-documents__form-field">
          <h3>Identity Document Front</h3>
          <FileInput
            documentType={types.ID_Front.documentType}
            removeCallback={removeDocument}
            changeCallback={addDocument}
          />
        </div>
        <div className="upload-documents__form-field">
          <h3>Identity Document Back</h3>
          <FileInput
            documentType={types.ID_Back.documentType}
            removeCallback={removeDocument}
            changeCallback={addDocument}
          />
        </div>
        <div className="upload-documents__form-field">
          <h3>
            Selfie with the code <strong>{selfieCode}</strong>
          </h3>
          <FileInput
            documentType={types.ID_Selfie.documentType}
            removeCallback={removeDocument}
            changeCallback={addDocument}
          />
        </div>
        <div className="upload-documents__form-field">
          <h3>Verified Proof of Residence</h3>
          <FileInput
            documentType={types.Utility_Bill.documentType}
            removeCallback={removeDocument}
            changeCallback={addDocument}
          />
        </div>
        <DefaultButton
          fullWidth
          variant="contained"
          disabled={disabled || submitting}
          onClick={onSubmit}
        >
          Submit
        </DefaultButton>
        <div className="error-text">{error}</div>
      </div>
    </div>
  );
};

export default UploadDocuments;
