import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import DefaultButton from '../../Buttons/DefaultButton';
import './VerificationActions.scss';

const VerificationActions = props => {
  const { close, buttonCallback, buttonText, isSubmitting, disabled } = props;

  return (
    <div className='verification-form__actions'>
      <DefaultButton
        onClick={close}
      >
                Verify Later
      </DefaultButton>
      <DefaultButton
        onClick={buttonCallback}
        disabled={disabled || isSubmitting}
      >
        {isSubmitting ? <CircularProgress color='secondary' size={20} /> : buttonText}
      </DefaultButton>
    </div>
  );
};

VerificationActions.propTypes = {
  close: PropTypes.func.isRequired,
  buttonCallback: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool,
  disabled: PropTypes.bool
};

export default VerificationActions;
