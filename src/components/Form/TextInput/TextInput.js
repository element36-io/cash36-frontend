import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import styles from './MuiStyles';

export const TextInput = ({
  classes,
  name,
  label,
  onChange,
  placeholder,
  value,
  type = 'text',
  error,
  disabled,
  isTouched,
  multiline,
  onBlur = () => {}
}) => (
  <div className={`element-form__input-wrapper ${name}`}>
    <TextField
      name={name}
      label={label}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      autoComplete="off"
      value={value}
      fullWidth
      rows={3}
      multiline={multiline}
      className={classes.root}
      disabled={disabled}
      InputLabelProps={{
        shrink: true
      }}
    />
    {isTouched && error && <p className="form-error">{error}</p>}
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isTouched: PropTypes.bool,
  multiline: PropTypes.bool
};

export default withStyles(styles)(TextInput);
