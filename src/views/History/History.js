import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import ActivityTable from '../../components/ActivityTable';
import { getUserActivity } from '../../store/tokens/tokens.actions';
import Responsive from '../../components/Responsive';
import DateRange from './DateRange';
import SearchBox from './SearchBox';
import FilterByStatus from './FilterByStatus';
import ExportData from './ExportData';
import DateRangeMobile from './DateRangeMobile';
import FilterSettingsMobile from './FilterSettingsMobile';

import './History.scss';

class History extends Component {
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

  componentDidMount () {
    this.props.getUserActivity();
  }

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

  handleEndDateChange = date => {
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

  render () {
    const { userActivity, fetchingFilters } = this.props;
    return (
      <div className='wrapper'>
        <div className='history'>
          <div className='history__content'>
            {userActivity === undefined
              ? (
                <div className='history__loader'>
                  <CircularProgress color='primary' size={75} />
                </div>
              )
              : (
                userActivity.length > 0
                  ? <div>
                    <div className='history__filters'>
                      <Responsive>
                        <DateRange
                          startDate={this.state.startDate}
                          endDate={this.state.endDate}
                          handleStartDateChange={this.handleStartDateChange}
                          handleEndDateChange={this.handleEndDateChange}
                        />
                        <SearchBox
                          searchTerm={this.state.filters.filterValue}
                          handleSearchChange={this.handleSearchChange}
                          handleSearchTextSubmit={this.handleSearchTextSubmit}
                        />
                        <FilterByStatus
                          filterByStatus={this.state.filterByStatus}
                          handleFilterByStatusChange={this.handleFilterByStatusChange}
                        />
                        <ExportData />
                      </Responsive>
                      <Responsive isMobile>
                        <DateRangeMobile />
                        <FilterSettingsMobile />
                        <SearchBox
                          searchTerm={this.state.searchTerm}
                          handleSearchChange={this.handleSearchChange}
                          handleSearchTextSubmit={this.handleSearchTextSubmit}
                        />
                      </Responsive>
                    </div>
                    <div className='history__filter-loader-wrapper'>
                      <div style={fetchingFilters ? { opacity: '.3' } : null}>
                        <ActivityTable userActivity={userActivity} />
                      </div>
                      {fetchingFilters &&
                        <div
                          className='history__filter-loader'
                        >
                          <CircularProgress
                            color='primary'
                            size={75}
                          />
                        </div>}
                    </div>
                  </div>
                  : <div className='paper history__no-activity'>
                    <h3>No Activity History</h3>
                    <p>Keep track of your most recent transactions here when you sell, buy or transfer cash36
                      currencies.</p>
                  </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { userActivity, fetchingFilters } }) => ({
  userActivity,
  fetchingFilters
});

History.propTypes = {
  userActivity: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, { getUserActivity })(History);
