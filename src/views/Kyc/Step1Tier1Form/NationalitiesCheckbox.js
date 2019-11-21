import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const NationalitiesCheckbox = ({
  formProps: { values, setFieldValue },
  fieldName
}) => {
  const handleChange = evt => {
    const checked = evt.target.checked;
    setFieldValue(fieldName, checked, true);
    if (!checked) {
      setFieldValue('nationality2', '', true);
      setFieldValue('nationality3', '', true);
      setFieldValue('nationality4', '', true);
    }
  };

  return (
    <FormControlLabel
      label="I have more than one Nationality"
      control={
        <Checkbox
          checked={values.moreNationalities}
          onChange={handleChange}
          color="primary"
        />
      }
    />
  );
};

NationalitiesCheckbox.propTypes = {
  formProps: PropTypes.object,
  fieldName: PropTypes.string
};

export default NationalitiesCheckbox;
