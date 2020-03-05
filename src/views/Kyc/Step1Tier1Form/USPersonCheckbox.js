import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const USPersonCheckbox = ({
  formProps: { values, setFieldValue },
  fieldName
}) => {
  const handleChange = evt => {
    const checked = evt.target.checked;
    setFieldValue(fieldName, checked, true);
  };

  return (
    <FormControlLabel
      label="I am a US Person"
      control={
        <Checkbox
          checked={values.USPerson}
          onChange={handleChange}
          color="primary"
        />
      }
    />
  );
};

USPersonCheckbox.propTypes = {
  formProps: PropTypes.object,
  fieldName: PropTypes.string
};

export default USPersonCheckbox;
