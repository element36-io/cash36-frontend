import React from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TextField, MenuItem, withStyles } from '@material-ui/core';
import styles from './MuiStyles';

export const SelectInput = ({
  name,
  label,
  value,
  onChange,
  list,
  error,
  onBlur,
  isTouched,
  placeholder,
  countryList,
  classes
}) => {
  return (
    <div
      className={`element-form__input-wrapper element-form__input-wrapper--select  ${name}`}
    >
      <TextField
        id={`text-field-${name}`}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        select
        fullWidth
        className={classes.root}
        InputProps={{
          disableUnderline: true
        }}
        InputLabelProps={{
          shrink: true
        }}
        SelectProps={{
          displayEmpty: true,
          IconComponent: KeyboardArrowDownIcon,
          className: 'invest-select'
        }}
      >
        <MenuItem value="" disabled>
          <div className={classes.placeholder}>
            <span className={classes.placeholderText}>{placeholder}</span>
          </div>
        </MenuItem>
        {list.map(item => (
          <MenuItem
            key={item.code || item.value}
            value={item.code || item.value}
          >
            {countryList && (
              <ReactCountryFlag
                code={item.code}
                svg
                styleProps={{
                  width: '2rem',
                  height: '1.3rem',
                  backgroundSize: 'cover',
                  marginRight: '.5rem'
                }}
              />
            )}{' '}
            {item.name || item.label}
          </MenuItem>
        ))}
      </TextField>
      {isTouched && error && <p className="form-error">{error}</p>}
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  placeholder: PropTypes.string,
  isTouched: PropTypes.bool,
  classes: PropTypes.object,
  countryList: PropTypes.bool
};

SelectInput.defaultProps = {
  onBlur: () => {}
};

export default withStyles(styles)(SelectInput);
