import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = props => {
  const { avatarUrl, cssClass, alt } = props;

  return (
    <div className={`avatar ${cssClass || ''}`}>
      {avatarUrl ? <img src={avatarUrl} alt={alt} /> : <i className="fas fa-user" />}
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  cssClass: PropTypes.string,
  alt: PropTypes.string
};

export default Avatar;
