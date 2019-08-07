import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AvatarContext } from '../../providers/avatar.provider';
import { checkIfUrlContainsImage } from '../../helpers/image.helpers';
import './Avatar.scss';

const Avatar = ({ avatarUrl, cssClass, alt, username }) => {
  const { state, actions } = useContext(AvatarContext);

  const fetchImage = async () => {
    if (state[username] || !avatarUrl) return;
    try {
      const imageUrl = await checkIfUrlContainsImage(avatarUrl);
      actions.add(username, imageUrl);
    } catch (error) {
      console.warn('Avatar does not exist.');
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className={`avatar ${cssClass || ''}`}>
      {state[username] ? (
        <img src={state[username]} alt={alt} />
      ) : (
        <i className="fas fa-user" data-testid="avatar__icon" />
      )}
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  cssClass: PropTypes.string,
  alt: PropTypes.string,
  username: PropTypes.string
};

export default Avatar;
