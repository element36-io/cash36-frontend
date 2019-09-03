import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { MenuItem, TextField } from '@material-ui/core';

import './BasicSelectInput.scss';

const BasicSelectInput = ({
  name,
  list,
  value,
  onChange,
  label,
  disabled = false,
  placeholder,
  error
}) => {
  return (
    <div>
      <TextField
        id={`text-field-${name}`}
        name={name}
        select
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        disabled={disabled}
        InputProps={{
          disableUnderline: false,
          style: {
            fontSize: '1.6rem'
          }
        }}
        InputLabelProps={{
          shrink: true
        }}
        SelectProps={{
          displayEmpty: true,
          IconComponent: KeyboardArrowDownIcon
        }}
        className="basic-select"
      >
        <MenuItem value="" disabled>
          <div className="basic-select__placeholder">
            <span className="basic-select__placeholder-text">
              {placeholder}
            </span>
          </div>
        </MenuItem>
        {list.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

BasicSelectInput.propTypes = {
  list: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string
};

export default BasicSelectInput;
