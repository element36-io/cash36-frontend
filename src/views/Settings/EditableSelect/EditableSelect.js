import React from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import { TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styles from './MuiStyles';

export const EditableSelect = ({ classes, name, label, value, onChange, countryData, disabled }) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    select
    disabled={disabled}
    fullWidth
    className={classes.root}
    InputProps={{
      disableUnderline: true,
      style: {
        color: '#01152C',
        borderBottom: disabled ? '1px solid transparent' : '1px solid #EDF0F4'
      }
    }}
    InputLabelProps={{
      shrink: true,
      className: classes.label
    }}
    SelectProps={{
      displayEmpty: true,
      IconComponent: disabled ? 'span' : KeyboardArrowDownIcon
    }}
  >
    {countryData.map(country => {
      return (
        <MenuItem key={country.code} value={country.code}>
          <ReactCountryFlag
            code={country.code}
            svg
            styleProps={{
              width: '2rem',
              height: '1.3rem',
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

EditableSelect.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  countryData: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(EditableSelect);
