import React from 'react';
import PropTypes from 'prop-types';

import { getAvatarUrl } from '../../store/auth/auth.actions';
import useGet from '../../hooks/useGet';

import './Avatar.scss';

const Avatar = ({ cssClass, alt, isEditable = false }) => {
  let [avatarUrl, error] = useGet(getAvatarUrl);

  const uploadAvatar = event => {
    const { files } = event.target;

    const fileTypes = ['png', 'jpg', 'jpeg'];

    if (!files[0]) return;

    const isValidFileType = fileTypes.includes(
      files[0].name
        .split('.')
        .pop()
        .toLowerCase()
    );
    const isValidSize = files[0].size < 10485760;

    if (!isValidFileType) {
      error = 'Not a valid file type';
      return;
    }

    if (!isValidSize) {
      error = 'File is too big';
      return;
    }

    const formData = new FormData();

    formData.append('files', files[0]);
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
        <span className="error-text">{error}</span>
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
