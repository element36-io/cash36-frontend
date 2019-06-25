import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/Form/TextInput';
import BasicSelectInput from '../../../../components/Form/BasicSelectInput';
import './IndustryFields.scss';

const industryValues = [
  'Arms and armaments trade',
  'Gemstones and diamond trade',
  'Jewellery trade',
  'International trade in exotic animals',
  'Casino and lottery industry',
  'Sex industry',
  'Other'
];

const IndustryFields = React.memo(
  ({ changeHandler, values: { profession, industry, industryOther } }) => (
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
          name="industryOther"
          label="Other"
          placeholder="Enter Your Industry"
          onChange={changeHandler}
          value={industryOther}
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
