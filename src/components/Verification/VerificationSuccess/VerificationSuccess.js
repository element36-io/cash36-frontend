import React from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@material-ui/icons/Done';
import VerificationActions from '../VerificationActions';
import './VerificationSuccess.scss';

const VerificationSuccess = props => {
  const { close, next } = props;

  return (
    <div className='verification-form__success'>
      <div className='verification-form__icon-wrapper'>
        <DoneIcon />
      </div>
      <h2>
            Success
      </h2>
      <p>You can move on to Tier 2 Verification</p>
      <VerificationActions close={close} buttonCallback={next} buttonText='Continue to tier 2 verification' />
    </div>
  );
};

VerificationSuccess.propTypes = {
  close: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
};

export default VerificationSuccess;
