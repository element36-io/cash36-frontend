import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import TodayIcon from '@material-ui/icons/Today';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import useStyles from './MuiStyles';

const DateRange = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  fetchingFilters
}) => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} paper`}>
      <div className={classes.picker}>
        <div className={classes.label}>
          <TodayIcon className={classes.icon} />
          <span>Start</span>
        </div>
        <div className={classes.pickerInputBox}>
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
            autoOk
            variant="inline"
            format={'DD/MM/YYYY'}
            disabled={fetchingFilters}
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
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
            autoOk
            variant="inline"
            format={'DD/MM/YYYY'}
            disabled={fetchingFilters}
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
  );
};

DateRange.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  fetchingFilters: PropTypes.bool.isRequired
};

export default DateRange;
