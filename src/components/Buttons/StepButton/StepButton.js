import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DefaultButton from '../DefaultButton';

import './StepButton.scss';

const StepButton = ({ text, onClick, disabled }) => (
  <DefaultButton
    variant='raised'
    type='button'
    size='large'
    fullWidth
    disabled={disabled}
    className='step-button'
    onClick={onClick}
    style={disabled && { opacity: '0.5' }}
  >
    <span>{text}</span>
    <ArrowForwardIcon />
  </DefaultButton>
);

StepButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default StepButton;
