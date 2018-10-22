import React from 'react';
import PropTypes from 'prop-types';
import Date from './Date';
import Status from './Status';
import Action from './Action';
import Amount from './Amount';

import './ActivityTable.scss';

const ActivityTable = ({ userActivity }) => (
  <div className='activity-table'>
    <div className='activity-table__head activity-table__row'>
      <div>Date</div>
      <div>Action</div>
      <div>Status</div>
      <div>Amount</div>
    </div>
    <div className='activity-table__body paper'>
      {userActivity.map((activity, index) => {
        return (
          <div key={index} className='activity-table__row'>
            <div><Date date={activity.date} /></div>
            <div><Action type={activity.action} username={activity.targetAddress} /></div>
            <div><Status status={activity.status} /></div>
            <div><Amount type={activity.action} amount={activity.amount} symbol={activity.symbol} /></div>
          </div>
        );
      })}
    </div>
  </div>
);

ActivityTable.propTypes = {
  userActivity: PropTypes.array
};

export default ActivityTable;
