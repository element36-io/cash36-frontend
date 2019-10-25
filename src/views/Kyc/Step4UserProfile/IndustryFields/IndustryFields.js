import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/Form/TextInput';
import BasicSelectInput from '../../../../components/Form/BasicSelectInput';
import './IndustryFields.scss';

const IndustryFields = React.memo(
  ({
    changeHandler,
    values: { profession, industry, industryOther },
    professionError,
    industryError,
    industryOtherError,
    industryList
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
        name="industry"
        list={industryList}
        label="Industry"
        placeholder="Enter Your Industry"
        value={industry}
        onChange={changeHandler}
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
    </div>
  )
);

IndustryFields.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  industryError: PropTypes.bool,
  professionError: PropTypes.bool,
  industryOtherError: PropTypes.bool,
  industryList: PropTypes.array
};

export default IndustryFields;
