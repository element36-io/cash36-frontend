import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import styles from './MuiStyles';

export const EditableInput = ({ classes, name, label, onChange, value, disabled, type = 'text' }) => (
  <TextField
    name={name}
    label={label}
    type={type}
    onChange={onChange}
    autoComplete="off"
    value={value}
    fullWidth
    disabled={disabled}
    className={classes.root}
    InputLabelProps={{
      shrink: true,
      className: classes.label
    }}
    InputProps={{
      disableUnderline: true,
      style: {
        borderBottom: disabled ? '1px solid transparent' : '1px solid #EDF0F4'
      }
    }}
  />
);

EditableInput.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default withStyles(styles)(EditableInput);
