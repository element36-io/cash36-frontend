import React, { useState, useEffect, createContext } from 'react';

import { getAvatar } from '../store/auth/auth.actions';

export const AvatarContext = createContext();

const AvatarProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const callGetAvatar = async () => {
    try {
      const response = await getAvatar();
      console.log(response);

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

export default AvatarProvider;
