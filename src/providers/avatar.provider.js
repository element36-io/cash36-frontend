import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import { getAvatar } from '../store/auth/auth.actions';

export const AvatarContext = createContext();

const AvatarProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const callGetAvatar = async () => {
    try {
      const response = await getAvatar();

      if (!response.data) {
        setAvatarUrl('');
        return;
      }

      setAvatarUrl(
        `${response.dataType};${response.encoding}, ${response.data}`
      );
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    callGetAvatar();
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarUrl, error, callGetAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

AvatarProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default AvatarProvider;
