import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ProcessHeader from '../ProcessHeader';
import ProcessControls from '../ProcessControls';
import Responsive from '../../../components/Responsive';

import './Step0ProcessWelcomeScreen.scss';

const Step0ProcessWelcomeScreen = ({ changeSteps }) => {
  const [submitting, setSubmitting] = useState(false);
  const nextStep = () => {
    setSubmitting(true);
    changeSteps('0', {});
  };

  return (
    <div className="process-welcome-screen">
      <ProcessHeader title="Welcome to element36" />
      <p>Thank you for choosing element36!</p>
      <p>
        Having your account fully verified allows you to cross the limits of
        regular account users, therefore, you can transfer greater amounts of
        money.
      </p>
      <p>Please have the following documents ready before you start:</p>
      <ul>
        <li>- ID or Passport</li>
        <li>- Utility Bill (stating your domicile address)</li>
        <Responsive>
          <li>- Mobile Phone with a camera</li>
        </Responsive>
        <li>- A Piece of Paper and a Pen</li>
        <Responsive isMobile>
          <li>- eBanking</li>
        </Responsive>
      </ul>

      <ProcessControls
        submitLabel="Start Verification Process"
        submitCallback={nextStep}
        submitting={submitting}
        disabled
      />
    </div>
  );
};

Step0ProcessWelcomeScreen.propTypes = {
  changeSteps: PropTypes.func.isRequired
};

export default Step0ProcessWelcomeScreen;
