import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Responsive from '../../../components/Responsive';
import DateRange from '../DateRange';
import SearchBox from '../SearchBox';
import FilterByStatus from '../FilterByStatus';
import ExportData from '../ExportData';
import DateRangeMobile from '../DateRangeMobile';
import FilterSettingsMobile from '../FilterSettingsMobile';

class HistoryFilters extends Component {
  render () {
    return (
      <div className='history__filters'>
        <Responsive isDesktop>
          <DateRange
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            handleStartDateChange={this.props.handleStartDateChange}
            handleEndDateChange={this.props.handleEndDateChange}
            fetchingFilters={this.props.fetchingFilters}
          />
          <SearchBox
            searchTerm={this.props.filters.filterValue}
            handleSearchChange={this.props.handleSearchChange}
            handleSearchTextSubmit={this.props.handleSearchTextSubmit}
            fetchingFilters={this.props.fetchingFilters}
          />
          <FilterByStatus
            filterByStatus={this.props.filterByStatus}
            handleFilterByStatusChange={this.props.handleFilterByStatusChange}
            fetchingFilters={this.props.fetchingFilters}
          />
          <ExportData />
        </Responsive>
        <Responsive isTablet>
          <DateRangeMobile />
          <FilterSettingsMobile />
          <SearchBox
            searchTerm={this.props.filters.filterValue}
            handleSearchChange={this.props.handleSearchChange}
            handleSearchTextSubmit={this.props.handleSearchTextSubmit}
            fetchingFilters={this.props.fetchingFilters}
          />
        </Responsive>
      </div>
    );
  }
}

HistoryFilters.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  filters: PropTypes.object.isRequired,
  filterByStatus: PropTypes.string.isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  handleFilterByStatusChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchTextSubmit: PropTypes.func.isRequired
};

export default HistoryFilters;
