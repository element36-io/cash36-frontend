import React from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';

import './Action.scss';

const renderActionName = type => {
  if (type === 'BUY') return 'Bought Tokens';
  if (type === 'SELL') return 'Sold Tokens';
  if (type === 'SENT') return 'Sent to';
  if (type === 'RECEIVED') return 'Bought Tokens';
};

const Action = ({ type, targetAddress }) => {
  return (
    <div className="activity-table-action">
      <div>{renderActionName(type)}</div>
      <span><TruncateString text={targetAddress} /></span>
    </div>
  );
};

Action.propTypes = {
  type: PropTypes.string.isRequired,
  targetAddress: PropTypes.string.isRequired
};

export default Action;
