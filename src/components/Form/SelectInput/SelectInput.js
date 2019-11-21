import React from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { MenuItem, withStyles, Select, InputLabel } from '@material-ui/core';
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
  relatedField,
  countryList,
  classes,
  formValues,
  setFieldValue,
  isNative
}) => {
  const changeHandler = evt => {
    onChange(evt);
    if (relatedField && !formValues[relatedField]) {
      setFieldValue(relatedField, evt.target.value, true);
    }
  };

  return (
    <div
      className={`element-form__input-wrapper element-form__input-wrapper--select  ${name}`}
    >
      <InputLabel id={`select-${name}-label`} shrink>
        {label}
      </InputLabel>
      <Select
        id={`text-field-${name}`}
        name={name}
        value={value}
        onChange={changeHandler}
        onBlur={onBlur}
        fullWidth
        className={classes.root}
        disableUnderline
        native={isNative}
        displayEmpty
        autoComplete="off"
        IconComponent={KeyboardArrowDownIcon}
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
      </Select>
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
  onBsetFieldValuelur: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  relatedField: PropTypes.string,
  placeholder: PropTypes.string,
  isTouched: PropTypes.bool,
  classes: PropTypes.object,
  countryList: PropTypes.bool,
  formValues: PropTypes.object,
  isNative: PropTypes.bool
};

SelectInput.defaultProps = {
  onBlur: () => {}
};

export default withStyles(styles)(SelectInput);
