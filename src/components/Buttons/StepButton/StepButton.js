import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DefaultButton from '../DefaultButton';

import './StepButton.scss';

const StepButton = ({ text, onClick, disabled, type }) => (
  <DefaultButton
    variant="contained"
    type={type}
    size="large"
    fullWidth
    disabled={disabled}
    className="step-button"
    onClick={onClick}
  >
    <span>{text}</span>
    <ArrowForwardIcon />
  </DefaultButton>
);

StepButton.propTypes = {
  buttonText: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default StepButton;
