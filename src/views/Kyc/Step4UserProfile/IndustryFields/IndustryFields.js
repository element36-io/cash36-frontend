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
  ({
    changeHandler,
    values: { profession, industry, industryOther },
    professionError,
    industryError,
    industryOtherError
  }) => (
    <div className="verification-user-profile__industry">
      <TextInput
        name="profession"
        label="Profession"
        placeholder="Enter Your Profession"
        onChange={changeHandler}
        value={profession}
        isTouched
        error={professionError ? 'This field is required' : null}
      />
      <BasicSelectInput
        list={industryValues}
        name="industry"
        label="Industry"
        placeholder="Enter Your Industry"
        value={industry}
        onChange={changeHandler}
        isTouched
        error={industryError ? 'This field is required' : null}
      />
      {industry.toLowerCase() === 'other' && (
        <TextInput
          name="industryOther"
          label="Other"
          placeholder="Enter Your Industry"
          onChange={changeHandler}
          value={industryOther}
          isTouched
          error={industryOtherError ? 'This field is required' : null}
        />
      )}
      {/* {hasError && (
        <p className="verification-user-profile_error">
          These fields are required
        </p>
      )} */}
    </div>
  )
);

IndustryFields.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  industryError: PropTypes.bool,
  professionError: PropTypes.bool,
  industryOtherError: PropTypes.bool
};

export default IndustryFields;
