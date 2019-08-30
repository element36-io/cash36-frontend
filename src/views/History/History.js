import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import ActivityTable from '../../components/ActivityTable';
import { getUserActivity } from '../../store/tokens/tokens.actions';
import HistoryFilters from './HistoryFilters';

import './History.scss';

const History = ({
  userActivity,
  historyFiltered,
  fetchingFilters,
  getUserActivity
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    callGetUserActivity();
  }, []);

  const callGetUserActivity = async () => {
    try {
      await getUserActivity();
    } catch (error) {
      setError(error);
    }
  };

  const renderHistory = () => {
    if (userActivity.length === 0 && historyFiltered === false) {
      return (
        <div className="paper history__no-activity">
          <h3>No Activity History</h3>
          <p>
            Keep track of your most recent transactions here when you sell, buy
            or transfer cash36 currencies.
          </p>
        </div>
      );
    }

    if (userActivity.length === 0 && historyFiltered === true) {
      return (
        <div>
          <HistoryFilters
            fetchingFilters={fetchingFilters}
            historyFiltered={historyFiltered}
          />
          <div className="history__filter-loader-wrapper">
            <div
              className="history__filter-no-results paper"
              style={fetchingFilters ? { opacity: '.3' } : null}
            >
              <p>No results for this selected filter.</p>
            </div>
            {fetchingFilters && (
              <div className="history__filter-loader">
                <CircularProgress color="primary" size={65} />
              </div>
            )}
          </div>
        </div>
      );
    }
    if (userActivity.length > 0) {
      return (
        <div>
          <HistoryFilters
            fetchingFilters={fetchingFilters}
            historyFiltered={historyFiltered}
          />
          <div className="history__filter-loader-wrapper">
            <div style={fetchingFilters ? { opacity: '.3' } : null}>
              <ActivityTable userActivity={userActivity} />
            </div>
            {fetchingFilters && (
              <div className="history__filter-loader">
                <CircularProgress color="primary" size={75} />
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  if (error) {
    return (
      <div className="wrapper">
        <div className="history error-text">{error}</div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="history">
        <div className="history__content">
          {userActivity === undefined ? (
            <div className="history__loader">
              <CircularProgress color="primary" size={75} />
            </div>
          ) : (
            renderHistory()
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  tokens: { userActivity, fetchingFilters, historyFiltered }
}) => ({
  userActivity,
  fetchingFilters,
  historyFiltered
});

History.propTypes = {
  userActivity: PropTypes.arrayOf(PropTypes.object),
  fetchingFilters: PropTypes.bool,
  historyFiltered: PropTypes.bool
};

export default connect(
  mapStateToProps,
  { getUserActivity }
)(History);
