import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import ProcessHeader from '../ProcessHeader';
import ProcessControls from '../ProcessControls';
import RadioButtons from './RadioButtons';
import IndustryFields from './IndustryFields';
import SourceOfFunds from './SourceOfFunds';
import DetailsSource from './DetailsSource';

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

const Step4UserProfile = ({ changeSteps }) => {
  const [industry, setIndustry] = useState({
    profession: '',
    industry: '',
    other: ''
  });
  const [transactionVolume, setTransactionVolume] = useState('');
  const [incomeVolume, setIncomeVolume] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [sourceOfFundsOther, setSourceOfFundsOther] = useState('');
  const [sourceDetails, setSourceDetails] = useState('');

  const updateIndustry = useCallback(
    evt => {
      const { name, value } = evt.target;
      setIndustry({ ...industry, [name]: value });
    },
    [industry]
  );

  const updateSource = useCallback(
    evt => setSourceOfFunds(evt.target.value),
    []
  );

  const updateSourceOther = useCallback(
    evt => setSourceOfFundsOther(evt.target.value),
    []
  );

  const updateSourceDetails = useCallback(
    evt => setSourceDetails(evt.target.value),
    []
  );

  const submit = () => {
    console.warn(industry);
    console.warn(sourceOfFunds);
    console.warn(sourceOfFundsOther);
    console.warn(transactionVolume);
    console.warn(incomeVolume);
    console.warn(sourceDetails);
  };

  useEffect(() => {
    if (transactionVolume === 'LessThan10k') setSourceDetails('');
  }, [transactionVolume]);

  // () => {
  //   const payload = {
  //     incomeVolume,
  //     transactionVolume,
  //     industry,
  //     sourceOfFundsOther,
  //     sourceOfFunds
  //   };
  //   changeSteps(4, payload);
  // }

  const isDisabled =
    !incomeVolume ||
    !transactionVolume ||
    !industry.profession ||
    !industry.industry ||
    !sourceOfFunds ||
    (industry.industry.toLowerCase() === 'other' && !industry.other) ||
    (sourceOfFunds.toLowerCase() === 'other' && !sourceOfFundsOther) ||
    (transactionVolume !== 'LessThan10k' && !sourceDetails);

  return (
    <div className="verification-user-profile">
      <ProcessHeader
        title="Verification Process - Step 4"
        subtitle="For smooth operations, we need to comply with international Anti-Money-Laundering standards. We need to monitor constantly if your used funds match the declared source of funds."
      />
      <h4>Business and Financial Conditions</h4>
      <div className="verification-user-profile__row">
        <IndustryFields values={industry} changeHandler={updateIndustry} />
        <RadioButtons
          className="test"
          title="Declare your yearly income:"
          choices={yearlyIncomeValues}
          value={incomeVolume}
          onChange={event => setIncomeVolume(event.target.value)}
        />
      </div>
      <SourceOfFunds
        value={sourceOfFunds}
        otherValue={sourceOfFundsOther}
        updateValue={updateSource}
        updateOtherValue={updateSourceOther}
      />
      <div className="verification-user-profile__row">
        <RadioButtons
          title="What transaction volume per year do you expect?"
          choices={transactionVolumeValues}
          value={transactionVolume}
          onChange={event => setTransactionVolume(event.target.value)}
        />
      </div>
      {transactionVolume && transactionVolume !== 'LessThan10k' && (
        <DetailsSource
          sourceDetails={sourceDetails}
          updateSourceDetails={updateSourceDetails}
        />
      )}
      <ProcessControls
        submitLabel="Submit & Continue"
        submitCallback={submit}
        disabled={isDisabled}
      />
    </div>
  );
};

Step4UserProfile.propTypes = {
  changeSteps: PropTypes.func.isRequired
};

export default Step4UserProfile;
