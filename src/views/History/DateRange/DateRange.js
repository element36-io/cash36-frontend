import React, { Component } from 'react';
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

import './DateRange.scss';

const styles = theme => ({
  root: {
    padding: '1.2rem 1.6rem',
    display: 'inline-flex',
    flexWrap: 'wrap'
  },
  picker: {
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.greys.lightGrey}`,
      marginRight: '2rem',
      paddingRight: '1rem'
    }
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.4rem',
    color: '#01152C',
    opacity: '0.5'
  },
  labelText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.4rem',
    transform: 'translateY(1px)'
  },
  icon: {
    fontSize: '1.6rem',
    marginRight: '.5rem',
    color: '#01152C',
    opacity: '0.8'
  },
  input: {
    cursor: 'default',
    width: '100%',
    fontSize: '1.6rem',
    backgroundColor: 'transparent',
    zIndex: 4,
    '&>input': {
      padding: 0,
      cursor: 'pointer'
    }
  },
  pickerInputBox: {
    width: '12.7rem',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&>svg': {
      color: '#CCD0D5',
      position: 'absolute',
      right: 0
    }
  }
});

class DateRange extends Component {
  state = {
    startDate: null,
    endDate: null
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date }, () => {
      // Do something when the date is picked
      console.log(this.state.startDate);
    });
  }
  handleEndDateChange = (date) => {
    this.setState({ endDate: date }, () => {
      // Do something when the date is picked
      console.log(this.state.endDate);
    });
  }
  render () {
    const { startDate, endDate } = this.state;
    const { classes } = this.props;
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
                onChange={this.handleStartDateChange}
                format={'DD/MM/YYYY'}
                onlyCalendar
                rightArrowIcon={<RightArrowIcon />}
                leftArrowIcon={<LeftArrowIcon />}
                InputProps={{
                  disableUnderline: true,
                  placeholder: 'DD/MM/YYYY',
                  className: classes.input
                }}
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
                onChange={this.handleEndDateChange}
                format={'DD/MM/YYYY'}
                onlyCalendar
                rightArrowIcon={<RightArrowIcon />}
                leftArrowIcon={<LeftArrowIcon />}
                InputProps={{
                  disableUnderline: true,
                  placeholder: 'DD/MM/YYYY',
                  className: classes.input
                }}
              />
              <DownArrowIcon className={classes.arrowIcon} />
            </div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

DateRange.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(DateRange);
