import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import './FileInput.scss';

const FileInput = props => {
  const { documentType, changeCallback, removeCallback } = props;
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState(null);
  const [error, setError] = useState(false);
  const fileInput = React.createRef();

  const handleChange = evt => {
    const { files } = evt.target;
    const fileTypes = ['png', 'jpg', 'jpeg', 'pdf'];

    if (!files[0]) return;

    const isValidFileType = fileTypes.includes(files[0].name.split('.').pop());
    setProgress(0);
    setName(files[0].name);
    setError(!isValidFileType);

    let reader = new FileReader();

    reader.onprogress = data => {
      if (data.lengthComputable) {
        let progress = parseInt((data.loaded / data.total) * 100, 10);
        setProgress(progress);
      }
    };
    reader.readAsDataURL(files[0]);

    if (!isValidFileType) {
      removeCallback(documentType);
      return;
    }

    changeCallback(files[0], documentType);
  };

  return (
    <div className="tier2-form__file-input__container">
      <div
        className={`tier2-form__file-input ${name ? 'active' : ''} ${
          error ? 'error' : ''
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
        <label>
          <i className="fas fa-upload" />
          <input type="file" ref={fileInput} onChange={handleChange} />
        </label>
        {name && (
          <div className="tier2-form__file-input__progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      {error && <p>Only png, jpg, jpeg and pdf files are allowed</p>}
    </div>
  );
};

FileInput.propTypes = {
  changeCallback: PropTypes.func,
  removeCallback: PropTypes.func,
  documentType: PropTypes.string.isRequired
};

export default FileInput;
