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
    industryOther: ''
  });
  const [transactionVolume, setTransactionVolume] = useState('');
  const [incomeVolume, setIncomeVolume] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState({
    SavingsFromWork: false,
    Inheritance: false,
    Donation: false,
    Lottery: false,
    Other: false
  });
  const [sourceOfFundsOther, setSourceOfFundsOther] = useState('');
  const [sourceOfFundsDescription, setSourceOfFundsDescription] = useState('');
  const [errors, setErrors] = useState({
    industry: false,
    profession: false,
    industryOther: false,
    income: false,
    sourceOfFunds: false,
    sourceOfFundsDescription: false,
    transactionVolume: false
  });
  const [submitting, setSubmitting] = useState(false);

  const updateIndustry = useCallback(
    evt => {
      const { name, value } = evt.target;
      setIndustry({ ...industry, [name]: value });
    },
    [industry]
  );

  const updateSource = useCallback(
    evt =>
      setSourceOfFunds({
        ...sourceOfFunds,
        [evt.target.name]: evt.target.checked
      }),
    [sourceOfFunds]
  );

  const updateSourceOther = useCallback(
    evt => setSourceOfFundsOther(evt.target.value),
    []
  );

  const updateSourceDetails = useCallback(
    evt => setSourceOfFundsDescription(evt.target.value),
    []
  );

  const validateFields = () => ({
    industry: !industry.industry,
    industryOther:
      industry.industry.toLowerCase() === 'other' && !industry.industryOther,
    profession: !industry.profession,
    income: !incomeVolume,
    sourceOfFunds:
      !Object.values(sourceOfFunds).some(e => e) ||
      (sourceOfFunds.Other && !sourceOfFundsOther),
    sourceOfFundsDescription:
      transactionVolume !== 'LessThan10k' && !sourceOfFundsDescription,
    transactionVolume: !transactionVolume
  });

  const submit = () => {
    const sources = Object.keys(sourceOfFunds).reduce((acc, val) => {
      if (sourceOfFunds[val]) acc.push(val);
      return acc;
    }, []);

    const formErrors = validateFields();
    setErrors(formErrors);
    const hasErrors = Object.values(formErrors).filter(error => error).length;
    if (hasErrors) return;

    const payload = {
      ...industry,
      transactionVolume,
      incomeVolume,
      sourceOfFundsDescription,
      sourceOfFundsOther,
      sourceOfFunds: sources
    };
    setSubmitting(true);
    try {
      changeSteps(4, payload);
    } catch (e) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (transactionVolume === 'LessThan10k') setSourceOfFundsDescription('');
  }, [transactionVolume]);

  useEffect(() => {
    if (industry.industry.toLowerCase() !== 'other') {
      setIndustry({ ...industry, industryOther: '' });
    }
  }, [industry]);

  useEffect(() => {
    if (!sourceOfFunds.Other) setSourceOfFundsOther('');
  }, [sourceOfFunds]);

  const isInvalid = Object.values(errors).filter(error => error).length;

  return (
    <div className="verification-user-profile">
      <ProcessHeader
        title="Verification Process - Step 4"
        subtitle="For smooth operations, we need to comply with international Anti-Money-Laundering standards. We need to monitor constantly if your used funds match the declared source of funds."
      />
      <h4>Business and Financial Conditions</h4>
      <div className="verification-user-profile__row">
        <IndustryFields
          values={industry}
          changeHandler={updateIndustry}
          industryError={errors.industry}
          professionError={errors.profession}
          industryOtherError={errors.industryOther}
        />
        <div>
          <RadioButtons
            className="test"
            title="Declare your yearly income:"
            choices={yearlyIncomeValues}
            value={incomeVolume}
            onChange={event => setIncomeVolume(event.target.value)}
          />
          {errors.income && (
            <p className="verification-user-profile_error">Please select one</p>
          )}
        </div>
      </div>
      <SourceOfFunds
        hasError={errors.sourceOfFunds}
        values={sourceOfFunds}
        otherValue={sourceOfFundsOther}
        updateValue={updateSource}
        updateOtherValue={updateSourceOther}
      />
      <div className="verification-user-profile__row">
        <div>
          <RadioButtons
            title="What transaction volume per year do you expect?"
            choices={transactionVolumeValues}
            value={transactionVolume}
            onChange={event => setTransactionVolume(event.target.value)}
          />
          {errors.transactionVolume && (
            <p className="verification-user-profile_error">
              These fields are required
            </p>
          )}
        </div>
      </div>
      {transactionVolume && transactionVolume !== 'LessThan10k' && (
        <DetailsSource
          hasError={errors.sourceOfFundsDescription}
          sourceDetails={sourceOfFundsDescription}
          updateSourceDetails={updateSourceDetails}
        />
      )}
      {isInvalid > 0 && (
        <p className="verification-user-profile_error">
          Please fill out all the required fields
        </p>
      )}
      <ProcessControls
        submitLabel="Submit & Continue"
        submitCallback={submit}
        submitting={submitting}
      />
    </div>
  );
};

Step4UserProfile.propTypes = {
  changeSteps: PropTypes.func.isRequired
};

export default Step4UserProfile;
