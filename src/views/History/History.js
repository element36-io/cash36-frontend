import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import ActivityTable from '../../components/ActivityTable';
import { getUserActivity } from '../../store/tokens/tokens.actions';
import HistoryFilters from './HistoryFilters';
import BaseButton from '../../components/Buttons/BaseButton';

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

  renderHistory = () => {
    const { userActivity, historyFiltered, fetchingFilters } = this.props;

    if (userActivity.length === 0 && historyFiltered === false) {
      return <div className='paper history__no-activity'>
        <h3>No Activity History</h3>
        <p>Keep track of your most recent transactions here when you sell, buy or transfer cash36
                currencies.</p>
      </div>;
    }

    if (userActivity.length === 0 && historyFiltered === true) {
      return <div>
        <HistoryFilters
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          filters={this.state.filters}
          handleSearchChange={this.handleSearchChange}
          handleSearchTextSubmit={this.handleSearchTextSubmit}
          filterByStatus={this.state.filterByStatus}
          handleFilterByStatusChange={this.handleFilterByStatusChange}
          fetchingFilters={fetchingFilters}
        />
        <div className='history__filter-loader-wrapper'>
          <div className='history__filter-no-results paper' style={fetchingFilters ? { opacity: '.3' } : null}>
            <p>No Results, try another filter or</p> <BaseButton>reset all filters</BaseButton>
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
      </div>;
    }
    if (this.props.userActivity.length > 0) {
      return <div>
        <HistoryFilters
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          filters={this.state.filters}
          handleSearchChange={this.handleSearchChange}
          handleSearchTextSubmit={this.handleSearchTextSubmit}
          filterByStatus={this.state.filterByStatus}
          handleFilterByStatusChange={this.handleFilterByStatusChange}
          fetchingFilters={fetchingFilters}
        />
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
      </div>;
    }
  }

  render () {
    const { userActivity } = this.props;
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
              : this.renderHistory()
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { userActivity, fetchingFilters, historyFiltered } }) => ({
  userActivity,
  fetchingFilters,
  historyFiltered
});

History.propTypes = {
  userActivity: PropTypes.arrayOf(PropTypes.object),
  fetchingFilters: PropTypes.bool,
  historyFiltered: PropTypes.bool
};

export default connect(mapStateToProps, { getUserActivity })(History);
