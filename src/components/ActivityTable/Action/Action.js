import React from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';

import './Action.scss';

const Action = ({ type, username }) => (
  <div className='activity-table-action'>
    <div>{type === 'BUY' ? 'Received from' : 'Sent to'}</div>
    <span><TruncateString text={username} /></span>
  </div>
);

Action.propTypes = {
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default Action;
