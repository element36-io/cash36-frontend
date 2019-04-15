import React from 'react';
import PropTypes from 'prop-types';
import ActionStatus from '../../ActionStatus';
import './VerificationProgress.scss';

const VerificationProgress = props => {
  const { tier, children } = props;

  return (
    <div className="verification-form__progress">
      <ActionStatus type="progress" />
      <h2>{tier} Verification - In Progress</h2>
      <h2>Verification in progress</h2>
      <p>
                Thanks for submiting your details for the {tier} Verification
      </p>
      <p>
                We will notify you as soon as you pass the verification process
      </p>
      {children}
    </div>
  );
};

VerificationProgress.propTypes = {
  tier: PropTypes.string.isRequired,
  children: PropTypes.object
};

export default VerificationProgress;
