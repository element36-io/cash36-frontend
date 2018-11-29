import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';
import { withStyles } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import TodayIcon from '@material-ui/icons/Today';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import styles from './MuiStyles';

const DateRange = ({ classes, startDate, endDate, handleStartDateChange, handleEndDateChange }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={`${classes.root} paper`}>
        <div className={classes.picker}>
          <div className={classes.label}>
            <TodayIcon className={classes.icon} />
            <span>Start</span>
          </div>
          <div className={classes.pickerInputBox}>
            <InlineDatePicker
              autoOk
              value={startDate}
              onChange={handleStartDateChange}
              format={'DD/MM/YYYY'}
              onlyCalendar
              rightArrowIcon={<RightArrowIcon />}
              leftArrowIcon={<LeftArrowIcon />}
              InputProps={{
                disableUnderline: true,
                placeholder: 'DD/MM/YYYY',
                className: classes.input
              }}
              disableFuture
            />
            <DownArrowIcon className={classes.arrowIcon} />
          </div>
        </div>
        <div className={classes.picker}>
          <div className={classes.label}>
            <EventIcon className={classes.icon} />
            <span>End</span>
          </div>
          <div className={classes.pickerInputBox}>
            <InlineDatePicker
              autoOk
              value={endDate}
              onChange={handleEndDateChange}
              format={'DD/MM/YYYY'}
              onlyCalendar
              rightArrowIcon={<RightArrowIcon />}
              leftArrowIcon={<LeftArrowIcon />}
              InputProps={{
                disableUnderline: true,
                placeholder: 'DD/MM/YYYY',
                className: classes.input
              }}
              disableFuture
            />
            <DownArrowIcon className={classes.arrowIcon} />
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

DateRange.propTypes = {
  classes: PropTypes.object,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired
};

export default withStyles(styles)(DateRange);
