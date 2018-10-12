import React from 'react';
import PropTypes from 'prop-types';
import statuses from './statuses';

import './Status.scss';

const Status = ({ status }) => {
  return (
    <div className={`activity-table-status ${statuses[status].cssClass}`}>
      {statuses[status].Icon}
      <div className='activity-table-status__text'>{statuses[status].text}</div>
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired
};

export default Status;
