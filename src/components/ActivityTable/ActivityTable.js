import React from 'react';
import PropTypes from 'prop-types';
import Responsive from '../Responsive';
import Row from './Row';

import './ActivityTable.scss';

const ActivityTable = ({ userActivity }) => {
  let { initiatorUserId } = userActivity;

  return (
    <div className="activity-table">
      <Responsive>
        <div className="activity-table__head activity-table__row">
          <div className="activity-th-date">Date</div>
          <div className="activity-th-action">Action</div>
          <div className="activity-th-txid">TxId</div>

          <div className="activity-th-message">Message</div>
          {initiatorUserId && <div className="activity-th-who">Who</div>}
          <div className="activity-th-status">Status</div>
          <div className="activity-th-amount">Amount</div>
        </div>
      </Responsive>
      <div className="activity-table__body">
        {userActivity.map(activity => (
          <Row activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
};

ActivityTable.propTypes = {
  userActivity: PropTypes.array.isRequired
};

export default ActivityTable;
