import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

import FormHeader from '../../../components/Form/FormHeader';
import ProcessControls from '../ProcessControls';
import Responsive from '../../../components/Responsive';

import './Step2BeneficialOwner.scss';

const Step2BeneficialOwner = ({ changeSteps, stepError }) => {
  const [boChecked, setBoChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  return (
    <div className="beneficial-owner">
      <FormHeader
        title="Verification Process - Step 2"
        subtitle="Please confirm that you're the Beneficial Owner"
      />
      <div className="beneficial-owner__body">
        <div className="step-2__section">
          <Responsive>
            <p>Please confirm that you are the Beneficial Owner (BO):</p>
          </Responsive>
          <Responsive isMobile>
            <h4>Beneficial Owner</h4>
          </Responsive>

          <div className="beneficial-owner__checkbox-container">
            <Checkbox
              data-testid="beneficial-owner__checkbox"
              color="primary"
              onChange={() => {
                setBoChecked(prevChecked => !prevChecked);
              }}
              checked={boChecked}
            />
            <p>
              The contracting party declares herewith to be the sole Beneficial
              Owner (BO) regarding all funds brought into the business relation
              with element36 AG. The contracting party further commits to
              communicate any changes to element36 without prior request.
            </p>
            <div className="step-2__link">
              <a
                href="https://docs.google.com/document/d/e/2PACX-1vRCIp89o0FlUdCZmLxvphHQc7cSk9w45_1b_PVm03qBM7HhzG0-0nQYtlCZsXEU38uzYGrB2LOaGYWp/pub"
                target="_blank"
                rel="noopener noreferrer"
              >
                BO explained
              </a>
            </div>
          </div>
        </div>
        <div className="step-2__section">
          <Responsive>
            <p>Please accept our Terms and Conditions</p>
          </Responsive>
          <Responsive isMobile>
            <h4>Terms and Conditions</h4>
          </Responsive>

          <div className="beneficial-owner__checkbox-container">
            <Checkbox
              data-testid="beneficial-owner__checkbox"
              color="primary"
              onChange={() => {
                setTermsChecked(prevChecked => !prevChecked);
              }}
              checked={termsChecked}
            />
            <p>
              Yes, I have read understood the Terms & Conditions and accept it
              in full extend.
            </p>
            <div className="step-2__link">
              <a
                href="https://docs.google.com/document/d/e/2PACX-1vSoZx1QeOL1Zrshy8Jis1WAOv9LUtgi_dqje7_VIcObHAC82puvpPmhaj352p_Tm7d-XZyiIZaXBt4Z/pub"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
        <div className="step-2__section">
          <Responsive>
            <p>Please accept our Privacy Policy (GDPR)</p>
          </Responsive>
          <Responsive isMobile>
            <h4>Privacy Policy (GDPR)</h4>
          </Responsive>

          <div className="beneficial-owner__checkbox-container">
            <Checkbox
              data-testid="beneficial-owner__checkbox"
              color="primary"
              onChange={() => {
                setPrivacyChecked(prevChecked => !prevChecked);
              }}
              checked={privacyChecked}
            />
            <p>Yes, I accept the Privacy Policy.</p>
            <div className="step-2__link">
              <a
                href="https://docs.google.com/document/d/e/2PACX-1vSOcC_zA-j1mJMyTsXDHktybyyDEUsU3XE9-kINF2xNCRhhlQ8ul3UYiKpVxRcW4m0k-Bxt7aglHuCV/pub"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <ProcessControls
          disabled={!boChecked || !termsChecked || !privacyChecked}
          submitLabel="Submit & Continue"
          submitCallback={() => {
            changeSteps(2, {});
          }}
          error={stepError}
        />
      </div>
    </div>
  );
};

Step2BeneficialOwner.propTypes = {
  changeSteps: PropTypes.func.isRequired,
  stepError: PropTypes.string
};

export default Step2BeneficialOwner;
