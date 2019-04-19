import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ProcessHeader from '../ProcessHeader';
import ProcessControls from '../ProcessControls';
import RadioButtons from './RadioButtons';
import CheckboxButtons from './CheckboxButtons';
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

const sourcesOfFunds = [
  'SavingsFromWork',
  'Inheritance',
  'Lottery',
  'Donation',
  'Other'
];

const Step4UserProfile = ({ changeSteps }) => {
  const [transactionVolume, setTransactionVolume] = useState('');
  const [incomeVolume, setIncomeVolume] = useState('');
  const [profession, setProfession] = useState('');
  const [industry, setIndustry] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [sourceOfFundsOther, setSourceOfFundsOther] = useState('');

  const otherSelected = sourceOfFunds === 'Other';

  const buttonDisabled =
    !incomeVolume ||
    !transactionVolume ||
    !profession ||
    !industry ||
    !sourceOfFunds ||
    (otherSelected && !sourceOfFundsOther);

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
          onChange={event => setTransactionVolume(event.target.value)}
        />
        <RadioButtons
          title="Declare your yearly income:"
          choices={yearlyIncomeValues}
          value={incomeVolume}
          onChange={event => setIncomeVolume(event.target.value)}
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
      <h4>Source of Funds</h4>
      <div className="verification-user-profile__row">
        <CheckboxButtons
          sourceOfFunds={sourceOfFunds}
          sourcesOfFunds={sourcesOfFunds}
          sourceOfFundsOther={sourceOfFundsOther}
          otherSelected={otherSelected}
          onRadioChange={event => {
            if (sourceOfFundsOther) {
              setSourceOfFundsOther('');
            }
            setSourceOfFunds(event.target.value);
          }}
          onTextChange={event => {
            setSourceOfFundsOther(event.target.value);
          }}
        />
      </div>

      <ProcessControls
        submitLabel="Submit & Continue"
        submitCallback={() => {
          const payload = {
            incomeVolume,
            transactionVolume,
            profession,
            industry,
            sourceOfFundsOther,
            sourceOfFunds
          };
          changeSteps(4, payload);
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
