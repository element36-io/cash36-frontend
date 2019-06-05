import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AvatarContext } from '../../providers/avatar.provider';
import './Avatar.scss';

const Avatar = ({ avatarUrl, cssClass, alt, username }) => {
  const { state, actions } = useContext(AvatarContext);

  const fetchImage = async () => {
    if (state[username]) return;
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
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
        <i className="fas fa-user" />
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
