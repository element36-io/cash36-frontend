import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserActivity } from '../../../store/tokens/tokens.actions';
import Responsive from '../../../components/Responsive';
import DateRange from '../DateRange';
import SearchBox from '../SearchBox';
import FilterByStatus from '../FilterByStatus';
import ExportData from '../ExportData';
import DateRangeMobile from '../DateRangeMobile';
import FilterByStatusMobile from '../FilterByStatusMobile';
import BaseButton from '../../../components/Buttons/BaseButton';

class HistoryFilters extends Component {
  state = {
    startDate: null,
    endDate: null,
    filterByStatus: 'All',
    filters: {
      filterValue: '',
      from: '',
      to: '',
      status: ''
    }
  };

  handleFilterByStatusChange = event => {
    const previousFilter = this.state.filters.status;
    this.setState({ filterByStatus: event.target.value }, () => {
      const getStatus = () => {
        if (this.state.filterByStatus === 'All') return '';
        if (this.state.filterByStatus === 'Open') return 'OPEN';
        if (this.state.filterByStatus === 'Completed') return 'COMPLETED';
        if (this.state.filterByStatus === 'Processing') return 'PROCESSING';
        if (this.state.filterByStatus === 'On Hold') return 'ON_HOLD';
      };
      this.setState({ filters: {
        ...this.state.filters,
        status: getStatus()
      } }, () => {
        if (this.state.filters.status !== previousFilter) {
          this.props.getUserActivity(this.state.filters);
        }
      });
    });
  };

  handleSearchChange = event => {
    this.setState({ filters: {
      ...this.state.filters,
      filterValue: event.target.value
    } });
  };

  handleSearchTextSubmit = event => {
    event.preventDefault();

    this.props.getUserActivity(this.state.filters);
  }

  handleStartDateChange = date => {
    if (!this.props.fetchingFilters) {
      this.setState({ startDate: date }, () => {
        this.setState({
          filters: {
            ...this.state.filters,
            from: this.state.startDate.format('DD.MM.YYYY')
          }
        }, () => {
          this.props.getUserActivity(this.state.filters);
        });
      });
    }
  }

  handleEndDateChange = date => {
    if (!this.props.fetchingFilters) {
      this.setState({ endDate: date }, () => {
        this.setState({
          filters: {
            ...this.state.filters,
            to: this.state.endDate.format('DD.MM.YYYY')
          }
        }, () => {
          this.props.getUserActivity(this.state.filters);
        });
      });
    }
  }

  resetFilters = () => {
    this.setState({
      startDate: null,
      endDate: null,
      filterByStatus: 'All',
      filters: {
        filterValue: '',
        from: '',
        to: '',
        status: ''
      }
    }, () => {
      this.props.getUserActivity(this.state.filters);
    });
  }

  render () {
    const { startDate, endDate, filterByStatus, filters } = this.state;
    const { fetchingFilters, historyFiltered } = this.props;
    return (
      <div className='history__filters'>
        {historyFiltered && !fetchingFilters && <BaseButton
          className='history__filters__reset-btn'
          onClick={this.resetFilters}
        >
        Reset all filters
        </BaseButton>}
        <Responsive isDesktop>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            fetchingFilters={fetchingFilters}
          />
          <SearchBox
            searchTerm={filters.filterValue}
            handleSearchChange={this.handleSearchChange}
            handleSearchTextSubmit={this.handleSearchTextSubmit}
            fetchingFilters={fetchingFilters}
          />
          <FilterByStatus
            filterByStatus={filterByStatus}
            handleFilterByStatusChange={this.handleFilterByStatusChange}
            fetchingFilters={fetchingFilters}
          />
          <ExportData />
        </Responsive>
        <Responsive isTablet>
          <DateRangeMobile />
          <FilterByStatusMobile
            filterByStatus={filterByStatus}
            handleFilterByStatusChange={this.handleFilterByStatusChange}
            fetchingFilters={fetchingFilters}
          />
          <SearchBox
            searchTerm={filters.filterValue}
            handleSearchChange={this.handleSearchChange}
            handleSearchTextSubmit={this.handleSearchTextSubmit}
            fetchingFilters={fetchingFilters}
          />
        </Responsive>
      </div>
    );
  }
}

HistoryFilters.propTypes = {
  fetchingFilters: PropTypes.bool.isRequired,
  getUserActivity: PropTypes.func.isRequired
};

export default connect(null, { getUserActivity })(HistoryFilters);
