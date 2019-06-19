import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/Form/TextInput';
import BasicSelectInput from '../../../../components/Form/BasicSelectInput';
import './IndustryFields.scss';

const industryValues = [
  'Education',
  'Internet',
  'Computer Software',
  'Aviation',
  'Office',
  'Retail',
  'Marketing',
  'Other'
];

const IndustryFields = React.memo(
  ({ changeHandler, values: { profession, industry, other } }) => (
    <div className="verification-user-profile__industry">
      <TextInput
        name="profession"
        label="Profession"
        placeholder="Enter Your Profession"
        onChange={changeHandler}
        value={profession}
      />
      <BasicSelectInput
        list={industryValues}
        name="industry"
        label="Industry"
        placeholder="Enter Your Industry"
        value={industry}
        onChange={changeHandler}
      />
      {industry.toLowerCase() === 'other' && (
        <TextInput
          name="other"
          label="Other"
          placeholder="Enter Your Industry"
          onChange={changeHandler}
          value={other}
          disabled={industry.toLowerCase() !== 'other'}
        />
      )}
    </div>
  )
);

IndustryFields.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};

export default IndustryFields;
