import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Close';

import './FileInput.scss';

class FileInput extends PureComponent {
  state = {
    progress: 0,
    name: null,
    error: false
  };

  fileInput = React.createRef();

  fileTypes = ['png', 'jpg', 'jpeg', 'pdf'];

  removeItem = () => {
    const { removeCallback, documentType } = this.props;
    this.fileInput.current.value = '';
    this.setState({ name: null, error: false });
    removeCallback(documentType);
  };

  handleChange = evt => {
    const { changeCallback, documentType, removeCallback } = this.props;
    const { files } = evt.target;
    const ext = files[0].name.split('.').pop();

    this.setState({ progress: 0, name: files[0].name, error: !this.fileTypes.includes(ext) });

    let reader = new FileReader();

    reader.onprogress = data => {
      if (data.lengthComputable) {
        let progress = parseInt(((data.loaded / data.total) * 100), 10);
        this.setState({ progress });
      }
    };
    reader.readAsDataURL(files[0]);

    if (!this.fileTypes.includes(ext)) {
      removeCallback(documentType);
      return;
    }

    changeCallback(files[0], documentType);
  };

  render () {
    const { progress, name, error } = this.state;
    const { title } = this.props;

    return (
      <div className='verification-form__file-input__container'>
        <div className={`verification-form__file-input ${name ? 'active' : ''} ${error ? 'error' : ''}`}>
          <div className='verification-form__file-input__header'>
            <i className='fas fa-file' />
            {title}
          </div>
          <div className='verification-form__file-input__body'>
            {
              !name
                ? 'Upload a document or an image'
                : <Fragment>
                  <DeleteIcon onClick={this.removeItem} className='x' /> <span>{name}</span>
                </Fragment>
            }
          </div>
          <label>
            <i className='fas fa-upload' />
            <input type='file' ref={this.fileInput} onChange={this.handleChange} />
          </label>
          {
            name && (
              <div className='verification-form__file-input__progress'>
                <span style={{ width: `${progress}%` }} />
              </div>
            )
          }
        </div>
        {error && <p>Only png, jpg, jpeg and pdf files are allowed</p>}
      </div>
    );
  }
}

FileInput.propTypes = {
  changeCallback: PropTypes.func.isRequired,
  removeCallback: PropTypes.func.isRequired,
  documentType: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default FileInput;
