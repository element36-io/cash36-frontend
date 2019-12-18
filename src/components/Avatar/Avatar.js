import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Tooltip from '@material-ui/core/Tooltip';

import { uploadAvatar, deleteAvatar } from '../../store/auth/auth.actions';
import { AvatarContext } from '../../providers/avatar.provider';

import './Avatar.scss';

const Avatar = ({ cssClass, alt, isEditable = false }) => {
  const [error, setError] = useState('');

  const { avatarUrl, avatarError, callGetAvatar } = useContext(AvatarContext);

  if (avatarError) {
    // setError(avatarError);
    console.log(error);
  }

  const uploadNewAvatar = async event => {
    const { files } = event.target;

    const fileTypes = ['png', 'jpg', 'jpeg'];

    if (!files[0]) {
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

  const removeAvatar = async () => {
    try {
      await deleteAvatar();
      await callGetAvatar();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="avatar__container">
      {isEditable && (
        <div className="avatar__controls">
          <label className="avatar__upload">
            <input type="file" onChange={uploadNewAvatar} />
            <Tooltip title="Upload new avatar">
              <AttachmentIcon />
            </Tooltip>
          </label>

          {avatarUrl && (
            <div className="avatar__remove" onClick={removeAvatar}>
              <Tooltip title="Delete avatar">
                <DeleteIcon />
              </Tooltip>
            </div>
          )}
        </div>
      )}

      <div className={`avatar ${cssClass || ''}`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={alt} />
        ) : (
          <i className="fas fa-user" data-testid="avatar__icon" />
        )}
      </div>
    </div>
  );
};

Avatar.propTypes = {
  cssClass: PropTypes.string,
  alt: PropTypes.string,
  isEditable: PropTypes.bool
};

export default Avatar;
