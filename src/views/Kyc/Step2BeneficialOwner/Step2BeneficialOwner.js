import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

import FormHeader from '../../../components/Form/FormHeader';
import ProcessControls from '../ProcessControls';
import Responsive from '../../../components/Responsive';

import './Step2BeneficialOwner.scss';

const Step2BeneficialOwner = ({ changeSteps, stepError }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="beneficial-owner">
      <FormHeader
        title="Verification Process - Step 2"
        subtitle="Please confirm that you're the Beneficial Owner"
      />
      <div className="beneficial-owner__body">
        <Responsive>
          <p>
            Please confirm that you are the Beneficial Owner by accepting the
            following statement:
          </p>
        </Responsive>
        <Responsive isMobile>
          <h4>Beneficial Owner</h4>
        </Responsive>

        <div className="beneficial-owner__checkbox-container">
          <Checkbox
            data-testid="beneficial-owner__checkbox"
            color="primary"
            onChange={() => {
              setChecked(prevChecked => !prevChecked);
            }}
            checked={checked}
          />
          <p>
            The contracting party declares herewith to be the sole Beneficial
            Owner regarding all funds brought into this business relation. The
            contracting party further commits to communicate any changes to
            element36 without prior request. Sending funds within the KYC
            network means to share personal data with the recipient. Data will
            be: Name, Email, Nationality and Place of Living which you entered
            when onboarding.
          </p>
        </div>
        <ProcessControls
          disabled={!checked}
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
