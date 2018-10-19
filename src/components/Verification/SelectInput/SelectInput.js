import React from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import { TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './MuiStyles';

export const SelectInput = ({ classes, name, label, value, onChange, countryData }) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    select
    fullWidth
    className={classes.root}
    InputProps={{
      disableUnderline: true
    }}
    InputLabelProps={{
      shrink: true,
      className: classes.label
    }}
    SelectProps={{
      displayEmpty: true
    }}
  >
    <MenuItem value='' disabled>
      <div className={classes.placeholder}>
        <span className={classes.placeholderIcon}>?</span>
        <span className={classes.placeholderText}>Select your {name}</span>
      </div>
    </MenuItem>
    {countryData.map(country => {
      return (
        <MenuItem key={country.code} value={country.code}>
          <ReactCountryFlag
            code={country.code}
            svg
            styleProps={{
              width: '2rem',
              height: '1.3rem',
              boxShadow: '0 5px 10px 0 rgba(53,155,236,0.2)',
              backgroundSize: 'cover',
              marginRight: '.5rem'
            }}
          />
          <span className={classes.countryName}>{country.name}</span>
        </MenuItem>
      );
    })}
  </TextField>
);

SelectInput.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  countryData: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(SelectInput);
