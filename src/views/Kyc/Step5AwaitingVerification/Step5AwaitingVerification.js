import React from 'react';
import { Link } from 'react-router-dom';

import ActionStatus from '../../../components/ActionStatus';

import './Step5AwaitingVerification.scss';
import DefaultButton from '../../../components/Buttons/DefaultButton';

const Step5AwaitingVerification = () => {
  return (
    <div className="awaiting-verification">
      <ActionStatus type="progress" title="Verification Process completed" />
      <p>
        Thank you for submitting your details. We will now check your
        information. You will be notified as soon as the verification process is
        completed on our end.
      </p>
      <p>
        Please note that your verification can not be fully completed, until we
        have received your first bank transfer using the Buy Tokens
        functionality.
      </p>
      <Link to="/">
        <DefaultButton>Finish</DefaultButton>
      </Link>
    </div>
  );
};

export default Step5AwaitingVerification;
