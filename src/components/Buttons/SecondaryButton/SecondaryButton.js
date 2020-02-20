import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from '../DefaultButton';

import './SecondaryButton.scss';

const SecondaryButton = ({ children, onClick, className }) => {
  return (
    <DefaultButton
      className={`secondary-button ${className}`}
      onClick={onClick}
      style={{
        background:
          'linear-gradient(225.95deg, rgba(105, 184, 242, 0.1) 0%, rgba(1, 126, 229, 0.1) 100%)'
      }}
      data-testid="secondary-button"
    >
      {children}
    </DefaultButton>
  );
};

SecondaryButton.propTypes = {
  onClick: PropTypes.func
};

export default SecondaryButton;
