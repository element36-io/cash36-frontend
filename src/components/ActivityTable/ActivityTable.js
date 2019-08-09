import React from 'react';
import PropTypes from 'prop-types';
import Responsive from '../Responsive';
import Row from './Row';

import './ActivityTable.scss';

const ActivityTable = ({ userActivity }) => (
  <div className="activity-table">
    <Responsive>
      <div className="activity-table__head activity-table__row">
        <div>Date</div>
        <div>Action</div>
        <div>Status</div>
        <div>Amount</div>
      </div>
    </Responsive>
    <div className="activity-table__body paper">
      {userActivity.map(activity => (
        <Row activity={activity} key={activity.id} />
      ))}
    </div>
  </div>
);

ActivityTable.propTypes = {
  userActivity: PropTypes.array
};

export default ActivityTable;
