import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import './Action.scss';

const Action = ({ type, username }) => (
  <div className='activity-table-action'>
    <div>{type === 'BUY' ? 'Received from' : 'Sent to'}</div>
    <Typography noWrap>{username}</Typography>
  </div>
);

Action.propTypes = {
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default Action;
