import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import StyledButton from '../../StyledButton';
import './VerificationActions.scss';

const VerificationActions = props => {
  const { close, buttonCallback, buttonText, isSubmitting } = props;

  return (
    <div className='verification-form__actions'>
      <StyledButton
        onClick={close}
      >
                Verify Later
      </StyledButton>
      <StyledButton
        onClick={buttonCallback}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={20} /> : buttonText}
      </StyledButton>
    </div>
  );
};

VerificationActions.propTypes = {
  close: PropTypes.func.isRequired,
  buttonCallback: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool
};

export default VerificationActions;
