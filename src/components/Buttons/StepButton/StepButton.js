import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import DefaultButton from '../DefaultButton';

import './StepButton.scss';

const StepButton = ({ text, onClick, disabled, type, submitting }) => (
  <DefaultButton
    variant="contained"
    type={type}
    size="large"
    fullWidth
    disabled={disabled}
    className={`step-button ${submitting ? 'step-button--submitting' : ''}`}
    onClick={onClick}
  >
    {submitting ? (
      <CircularProgress
        data-testid="default-button__spinner"
        color="secondary"
        size={20}
      />
    ) : (
      <>
        <span>{text}</span>
        <ArrowForwardIcon data-testid="step-button__arrow" />
      </>
    )}
  </DefaultButton>
);

StepButton.propTypes = {
  buttonText: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  submitting: PropTypes.bool
};

export default StepButton;
