import React from 'react';
import PropTypes from 'prop-types';

import ActionStatus from '../../../components/ActionStatus';
import ProcessControls from '../ProcessControls';

import './Step1aConfirmTier1.scss';

const Step1aConfirmTier1 = ({ changeSteps, stepError }) => {
  return (
    <div className="confirm-tier-1">
      <div className="confirm-tier-1__heading">
        <ActionStatus type="progress" title="Tier 1 Reached" />
        <p>
          Thank you for submitting your details. At this stage you qualify for
          an allowance of a maximum amount of 200 CHF/EUR. To increase this
          limit, continue with the verification process.
        </p>
      </div>
      <ProcessControls
        submitLabel="Continue Verification Process"
        submitCallback={() => changeSteps('1a', {})}
        error={stepError}
      />
    </div>
  );
};

Step1aConfirmTier1.propTypes = {
  changeSteps: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default Step1aConfirmTier1;
