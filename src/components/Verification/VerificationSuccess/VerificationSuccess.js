import React from 'react';
import PropTypes from 'prop-types';
import ActionStatus from '../../ActionStatus';
import VerificationActions from '../VerificationActions';
import './VerificationSuccess.scss';

const VerificationSuccess = props => {
  const { close, next } = props;

  return (
    <div className='verification-form__success'>
      <ActionStatus type='success' />
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
