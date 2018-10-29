import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import requireAuth from '../../components/requireAuth';
import ActivityTable from '../../components/ActivityTable';
import { getUserActivity } from '../../store/tokens/tokens.actions';
import Responsive from '../../components/Responsive';
import DateRange from './DateRange';
import SearchBox from './SearchBox';
import FilterBy from './FilterBy';
import ExportData from './ExportData';
import DateRangeMobile from './DateRangeMobile';
import FilterSettingsMobile from './FilterSettingsMobile';
import './History.scss';

class History extends Component {
  state = {
    filterBy: 'Date',
    searchTerm: ''
  }
  componentDidMount () {
    this.props.getUserActivity();
  }

  handleFilterChange = event => {
    this.setState({ filterBy: event.target.value });
  }

  handleSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
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
              : (
                userActivity.length > 0
                  ? <div>
                    <div className='history__filters'>
                      <Responsive>
                        <DateRange />
                        <SearchBox
                          searchTerm={this.state.searchTerm}
                          handleSearchChange={this.handleSearchChange}
                        />
                        <FilterBy
                          filterBy={this.state.filterBy}
                          handleFilterChange={this.handleFilterChange}
                        />
                        <ExportData />
                      </Responsive>
                      <Responsive isMobile>
                        <DateRangeMobile />
                        <FilterSettingsMobile />
                        <SearchBox
                          searchTerm={this.state.searchTerm}
                          handleSearchChange={this.handleSearchChange}
                        />
                      </Responsive>
                    </div>
                    <ActivityTable userActivity={userActivity} />
                  </div>
                  : <div className='paper history__no-activity'>
                    <h3>No Activity History</h3>
                    <p>Keep track of your most recent transactions here when you sell, buy or transfer cash36 currencies</p>
                  </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { userActivity } }) => ({
  userActivity
});

History.propTypes = {
  userActivity: PropTypes.arrayOf(PropTypes.object)
};

export default requireAuth(connect(mapStateToProps, { getUserActivity })(History));
