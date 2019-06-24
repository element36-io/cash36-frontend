import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import TodayIcon from '@material-ui/icons/Today';

import './DateRangeMobile.scss';

class DateRangeMobile extends Component {
  render () {
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

export default DateRangeMobile;
