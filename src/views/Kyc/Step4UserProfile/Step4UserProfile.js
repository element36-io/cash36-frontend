import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@material-ui/core';

import ProcessHeader from '../ProcessHeader';
import ProcessControls from '../ProcessControls';
import RadioButtons from './RadioButtons';
import TextInput from '../../../components/Form/TextInput';
import BasicSelectInput from '../../../components/Form/BasicSelectInput';

import './Step4UserProfile.scss';

const transactionVolumeValues = [
  'LessThan10k',
  'From10kto50k',
  'From50kto100k',
  'MoreThan100k'
];

const yearlyIncomeValues = [
  'LessThan50k',
  'From50kto100k',
  'From100kto200k',
  'MoreThan200k'
];

const industryValues = [
  'Education',
  'Internet',
  'Computer Software',
  'Aviation',
  'Office',
  'Retail',
  'Marketing'
];

const Step4UserProfile = ({ changeSteps }) => {
  const [transactionVolume, setTransactionVolume] = useState(null);
  const [yearlyIncome, setYearlyIncome] = useState(null);
  const [profession, setProfession] = useState('');
  const [industry, setIndustry] = useState('');

  const buttonDisabled =
    !yearlyIncome || !transactionVolume || !profession || !industry;

  return (
    <div className="verification-user-profile">
      <ProcessHeader
        title="Verification Process - Step 4"
        subtitle="For smooth operations, we need to comply with international Anti-Money-Laundering standards. We need to monitor constantly if your used funds match the declared source of funds."
      />
      <div className="verification-user-profile__row">
        <RadioButtons
          title="What transaction volume per year do you expect?"
          choices={transactionVolumeValues}
          value={transactionVolume}
          handleChange={event => setTransactionVolume(event.target.value)}
        />
        <RadioButtons
          title="Declare your yearly income:"
          choices={yearlyIncomeValues}
          value={yearlyIncome}
          handleChange={event => setYearlyIncome(event.target.value)}
        />
      </div>
      <div className="verification-user-profile__row">
        <TextInput
          name="profession"
          label="Profession"
          placeholder="Enter Your Profession"
          onChange={event => {
            setProfession(event.target.value);
          }}
          value={profession}
        />
        <BasicSelectInput
          list={industryValues}
          name="industry"
          label="Industry"
          placeholder="Enter Your Industry"
          value={industry}
          onChange={event => setIndustry(event.target.value)}
        />
      </div>
      <div className="verification-user-profile__row verification-user-profile__source-of-funds">
        <h4>Source of Funds</h4>
        <div className="">
          <Checkbox color="primary" />
        </div>
      </div>

      <ProcessControls
        submitLabel="Submit & Continue"
        submitCallback={() => {
          console.log('submit payload to step 4');
          console.log(profession);
          // changeSteps(4, {});
        }}
        disabled={buttonDisabled}
      />
    </div>
  );
};

Step4UserProfile.propTypes = {
  changeSteps: PropTypes.func.isRequired
};

export default Step4UserProfile;
