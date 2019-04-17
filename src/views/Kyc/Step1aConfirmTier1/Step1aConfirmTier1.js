import React from 'react';

import ActionStatus from '../../../components/ActionStatus';
import KycProcessControls from '../KycProcessControls';

import './Step1aConfirmTier1.scss';

const Step1aConfirmTier1 = ({ changeSteps }) => {
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
      <KycProcessControls
        submitLabel="Continue Verification Process"
        submitCallback={() => changeSteps('1a', {})}
      />
    </div>
  );
};

export default Step1aConfirmTier1;
