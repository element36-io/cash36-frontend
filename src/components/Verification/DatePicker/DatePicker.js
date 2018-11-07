import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import styles from './MuiStyles';

const DatePicker = ({ classes, dateOfBirth, onChange, disabled = false, editable = false }) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <InlineDatePicker
      format={'DD/MM/YYYY'}
      value={moment(dateOfBirth, 'DD/MM/YYYY')}
      onChange={onChange}
      label='Date of Birth'
      disableFuture
      fullWidth
      disabled={disabled}
      rightArrowIcon={<RightArrowIcon />}
      leftArrowIcon={<LeftArrowIcon />}
      className={classes.root}
      InputProps={{
        disableUnderline: true,
        placeholder: 'DD/MM/YYYY',
        className: classes.input,
        style: {
          color: editable && '#01152C',
          borderBottom: disabled ? '1px solid transparent' : '1px solid #EDF0F4'
        }
      }}
      InputLabelProps={{
        shrink: true,
        className: classes.label
      }}
    />
  </MuiPickersUtilsProvider>
);

DatePicker.propTypes = {
  classes: PropTypes.object,
  dob: PropTypes.any,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(DatePicker);
