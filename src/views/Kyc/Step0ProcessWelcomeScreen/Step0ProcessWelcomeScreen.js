import React from 'react';
import PropTypes from 'prop-types';

import KycProcessControls from '../KycProcessControls';
import Responsive from '../../../components/Responsive';

import './Step0ProcessWelcomeScreen.scss';

const Step0ProcessWelcomeScreen = ({ changeSteps }) => {
  return (
    <div className="process-welcome-screen">
      <h2>Welcome to element36</h2>
      <hr className="hr-light" />
      <p>Thank you for choosing element36!</p>
      <p>
        Having your account fully verified allows you to cross the limits of
        regular account users, therefore, you can transfer greater amounts of
        money.
      </p>
      <p>Please have the following documents ready before you start:</p>
      <ul>
        <Responsive isMobile>
          <li>- ID or Passport</li>
          <li>- Utility Bill (stating your domicile address)</li>
          <li>- A Piece of Paper and a Pen</li>
          <li>- eBanking</li>
        </Responsive>
        <Responsive>
          <li>- ID or Passport</li>
          <li>- Utility Bill (stating your domicile address)</li>
          <li>- Mobile Phone with a camera</li>
          <li>- A Piece of Paper and a Pen</li>
        </Responsive>
      </ul>

      <KycProcessControls
        submitLabel="Start Verification Process"
        submitCallback={() => changeSteps('0', {})}
      />
    </div>
  );
};

Step0ProcessWelcomeScreen.propTypes = {
  changeSteps: PropTypes.func.isRequired
};

export default Step0ProcessWelcomeScreen;
