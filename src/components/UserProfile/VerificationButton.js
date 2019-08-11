import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DefaultButton from '../Buttons/DefaultButton';

const VerificationButton = ({ currentProcessStatus, caseId }) => {
  if (currentProcessStatus === 'CLOSED') return null;

  if (currentProcessStatus === 'NOT_STARTED') {
    return (
      <Link to={`/kyc/start`}>
        <DefaultButton variant="contained">Verify Account</DefaultButton>
      </Link>
    );
  }

  if (
    currentProcessStatus !== 'AWAITING_VERIFICATION' &&
    currentProcessStatus !== 'NOT_STARTED'
  ) {
    return (
      <Link to={`/kyc/${caseId}`}>
        <DefaultButton variant="contained">Continue Verification</DefaultButton>
      </Link>
    );
  }

  if (currentProcessStatus === 'AWAITING_VERIFICATION') {
    return (
      <div className="user-profile__buttons--awaiting">
        Awaiting Verification
      </div>
    );
  }
};

VerificationButton.propTypes = {
  currentProcessStatus: PropTypes.string.isRequired,
  caseId: PropTypes.string.isRequired
};

export default VerificationButton;
