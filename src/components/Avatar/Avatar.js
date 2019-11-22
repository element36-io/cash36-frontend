import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import API, { API_ROOT } from '../../config/api';

import './Avatar.scss';

const Avatar = ({ cssClass, alt, isEditable = false, avatarUrl }) => {
  const [error, setError] = useState('');

  avatarUrl = `${API_ROOT}/compliance/avatar`;

  const uploadAvatar = event => {
    const { files } = event.target;

    const fileTypes = ['png', 'jpg', 'jpeg'];

    if (!files[0]) {
      setError('You must choose a file');
      return;
    }

    const isValidFileType = fileTypes.includes(
      files[0].name
        .split('.')
        .pop()
        .toLowerCase()
    );
    const isValidSize = files[0].size < 10485760;

    if (!isValidFileType) {
      setError('Not a valid file type');
      return;
    }

    if (!isValidSize) {
      setError('File is too big');
      return;
    }

    const formData = new FormData();

    formData.append('file', files[0]);

    try {
      API.post(`/compliance/avatar`, formData);

      console.log('SUCCESS!!!');
    } catch (error) {
      console.log(error);
    }
  };

  if (isEditable) {
    return (
      <label className={`avatar ${cssClass || ''}`}>
        <input type="file" onChange={uploadAvatar} />
        {avatarUrl ? (
          <img src={avatarUrl} alt={alt} />
        ) : (
          <i className="fas fa-user" data-testid="avatar__icon" />
        )}
        {error && <span className="error-text">{error}</span>}
      </label>
    );
  }

  return (
    <div className={`avatar ${cssClass || ''}`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={alt} />
      ) : (
        <i className="fas fa-user" data-testid="avatar__icon" />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { avatarUrl: state.auth.user.avatarUrl };
};

Avatar.propTypes = {
  cssClass: PropTypes.string,
  alt: PropTypes.string,
  isEditable: PropTypes.bool
};

export default connect(mapStateToProps)(Avatar);
