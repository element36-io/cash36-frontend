import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import './FileInput.scss';

const FileInput = ({ documentType, changeCallback, removeCallback }) => {
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const fileInput = React.createRef();

  const handleChange = evt => {
    const { files } = evt.target;
    const fileTypes = ['png', 'jpg', 'jpeg', 'pdf'];

    if (!files[0]) return;

    const isValidFileType = fileTypes.includes(
      files[0].name
        .split('.')
        .pop()
        .toLowerCase()
    );
    const isValidSize = files[0].size < 10485760;

    setProgress(0);
    setName(isValidFileType && isValidSize ? files[0].name : null);
    setTypeError(!isValidFileType);
    setSizeError(!isValidSize);

    if (!isValidFileType || !isValidSize) {
      removeCallback(documentType);
      return;
    }

    let reader = new FileReader();

    reader.onprogress = data => {
      if (data.lengthComputable) {
        let progress = parseInt((data.loaded / data.total) * 100, 10);
        setProgress(progress);
      }
    };
    reader.readAsDataURL(files[0]);

    changeCallback(files[0], documentType);
  };

  return (
    <div className="tier2-form__file-input__container">
      <label
        className={`tier2-form__file-input ${name ? 'active' : ''} ${
          typeError || sizeError ? 'error' : ''
        }`}
      >
        <div className="tier2-form__file-input__body">
          {!name ? (
            'Upload a document or an image'
          ) : (
            <Fragment>
              <i className="fas fa-file" /> <span>{name}</span>
            </Fragment>
          )}
        </div>
        <span className="tier2-form__file-input__upload-icon">
          <i className="fas fa-upload" />
        </span>
        {name && (
          <div className="tier2-form__file-input__progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        )}
        <input
          type="file"
          ref={fileInput}
          onChange={handleChange}
          data-testid="kyc__file-input"
        />
      </label>
      {typeError && <p>Only png, jpg, jpeg and pdf files are allowed</p>}
      {sizeError && <p>Max file size is 10MB</p>}
    </div>
  );
};

FileInput.propTypes = {
  changeCallback: PropTypes.func,
  removeCallback: PropTypes.func,
  documentType: PropTypes.string.isRequired
};

export default FileInput;
