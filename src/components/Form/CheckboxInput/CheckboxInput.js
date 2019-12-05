import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import './CheckboxInput.scss';

const CheckboxInput = ({ label, value, onChange, name, type }) => {
  return (
    <FormControlLabel
      className="checkbox-input"
      label={label}
      control={
        <Checkbox
          checked={value}
          onChange={onChange}
          color="primary"
          name={name}
          id={name}
          type={type}
        />
      }
    />
  );
};

export default CheckboxInput;
