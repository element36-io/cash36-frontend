import React from 'react';

import DefaultButton from '../DefaultButton';

import './SecondaryButton.scss';

const SecondaryButton = ({ children, onClick }) => {
  return (
    <DefaultButton
      className="secondary-button"
      onClick={onClick}
      style={{
        background:
          'linear-gradient(225.95deg, rgba(105, 184, 242, 0.1) 0%, rgba(1, 126, 229, 0.1) 100%)'
      }}
    >
      {children}
    </DefaultButton>
  );
};

export default SecondaryButton;
