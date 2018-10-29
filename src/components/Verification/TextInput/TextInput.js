import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import styles from './MuiStyles';

export const TextInput = ({ classes, name, label, onChange, placeholder, value, type = 'text' }) => (
  <TextField
    name={name}
    label={label}
    type={type}
    onChange={onChange}
    placeholder={placeholder}
    autoComplete='off'
    value={value}
    fullWidth
    className={classes.root}
    InputLabelProps={{
      shrink: true,
      className: classes.label
    }}
    InputProps={{
      disableUnderline: true
    }}
  />
);

TextInput.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default withStyles(styles)(TextInput);
