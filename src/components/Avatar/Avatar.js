import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { uploadAvatar } from '../../store/auth/auth.actions';
import { AvatarContext } from '../../providers/avatar.provider';

import './Avatar.scss';

const Avatar = ({ cssClass, alt, isEditable = false }) => {
  const [error, setError] = useState('');

  const { avatarUrl, avatarError, callGetAvatar } = useContext(AvatarContext);

  if (avatarError) {
    setError(avatarError);
  }

  const uploadNewAvatar = async event => {
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
      await uploadAvatar(formData);
      await callGetAvatar();
    } catch (error) {
      setError(error);
    }
  };

  if (isEditable) {
    return (
      <label className={`avatar ${cssClass || ''}`}>
        <input type="file" onChange={uploadNewAvatar} />
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

Avatar.propTypes = {
  cssClass: PropTypes.string,
  alt: PropTypes.string,
  isEditable: PropTypes.bool
};

export default Avatar;
