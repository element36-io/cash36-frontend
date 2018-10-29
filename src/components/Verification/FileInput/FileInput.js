import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Close';

import './FileInput.scss';

class FileInput extends PureComponent {
    state = {
      progress: 0
    };

    fileInput = React.createRef();

    removeItem = () => {
      const { removeCallback, documentType } = this.props;
      this.fileInput.current.value = '';
      removeCallback(documentType);
    };

    handleChange = evt => {
      const { changeCallback, documentType } = this.props;
      const { files } = evt.target;

      this.setState({ progress: 0 });

      let reader = new FileReader();

      reader.onprogress = data => {
        if (data.lengthComputable) {
          let progress = parseInt(((data.loaded / data.total) * 100), 10);
          this.setState({ progress });
        }
      };
      reader.readAsDataURL(files[0]);

      changeCallback(files[0], documentType);
    };

    render () {
      const { progress } = this.state;
      const { title, documentName } = this.props;

      return (
        <div className={`verification-form__file-input ${documentName ? 'active' : ''}`}>
          <div className='verification-form__file-input__header'>
            <i className='fas fa-file' />
            {title}
          </div>
          <div className='verification-form__file-input__body'>
            {
              !documentName
                ? 'Upload a document or an image'
                : <Fragment>
                  <DeleteIcon onClick={this.removeItem} className='x' /> <span>{documentName}</span>
                </Fragment>
            }
          </div>
          <label>
            <i className='fas fa-upload' />
            <input type='file' ref={this.fileInput} onChange={this.handleChange} />
          </label>
          {
            documentName && (
              <div className='verification-form__file-input_progress'>
                <span style={{ width: `${progress}%` }} />
              </div>
            )
          }
        </div>
      );
    }
}

FileInput.propTypes = {
  changeCallback: PropTypes.func.isRequired,
  removeCallback: PropTypes.func.isRequired,
  documentType: PropTypes.string.isRequired,
  documentName: PropTypes.string,
  title: PropTypes.string
};

export default FileInput;
