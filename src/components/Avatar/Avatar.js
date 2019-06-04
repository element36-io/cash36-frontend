import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = ({ avatarUrl, cssClass, alt }) => {
  avatarUrl = 'https://www.deadlink';
  const [url, setUrl] = useState(null);

  const fetchImage = async () => {
    try {
      const response = await fetch(avatarUrl);

      const blob = await response.blob();

      const imageUrl = URL.createObjectURL(blob);

      setUrl(imageUrl);
    } catch (error) {
      setUrl(null);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className={`avatar ${cssClass || ''}`}>
      {url ? <img src={url} alt={alt} /> : <i className="fas fa-user" />}
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  cssClass: PropTypes.string,
  alt: PropTypes.string
};

export default Avatar;
