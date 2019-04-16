import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Responsive from '../../../components/Responsive';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton/SecondaryButton';

import './Step1ProcessWelcomeScreen.scss';

const Step1ProcessWelcomeScreen = ({ changeSteps }) => {
  const [toHome, redirectToHome] = useState(false);

  if (toHome) return <Redirect to="/" />;

  return (
    <div className="process-welcome-screen">
      <h2>Welcome to element36</h2>
      <hr />
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
      <div className="process-welcome-screen__buttons">
        <SecondaryButton
          onClick={() => {
            redirectToHome(true);
          }}
        >
          Verify Later
        </SecondaryButton>
        <DefaultButton onClick={() => changeSteps(0, {})}>
          Start Verification Process
        </DefaultButton>
      </div>
    </div>
  );
};

export default Step1ProcessWelcomeScreen;
