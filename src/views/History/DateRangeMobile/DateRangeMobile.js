import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import TodayIcon from '@material-ui/icons/Today';

import './DateRangeMobile.scss';

class DateRangeMobile extends Component {
  render() {
    const {
      startDate,
      endDate,
      handleMobileRangeDateChange,
      visible,
      toggleFiltersVisible
    } = this.props;
    return (
      <div className="date-range-mobile paper">
        <TodayIcon onClick={toggleFiltersVisible} />
        <DateRange
          calendars={1}
          rangedCalendars
          onChange={handleMobileRangeDateChange}
          onInit={handleMobileRangeDateChange}
          maxDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          twoStepChange
          style={{
            transition: 'all .2s',
            visibility: visible ? 'visible' : 'hidden',
            opacity: visible ? '1' : '0'
          }}
        />
      </div>
    );
  }
}

DateRangeMobile.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  handleMobileRangeDateChange: PropTypes.func,
  visible: PropTypes.bool,
  toggleFiltersVisible: PropTypes.func
};

export default DateRangeMobile;
