import React from 'react';
import PropTypes from 'prop-types';
import ZeroXAddress from '../../ZeroXAddress';

import './Action.scss';

const renderActionName = type => {
  if (type === 'BUY') return 'New tokens created';
  if (type === 'SELL') return 'Sold tokens';
  if (type === 'SENT') return 'Tokens sent to';
  if (type === 'RECEIVED') return 'Received tokens';
  if (type === 'APPROVED') return 'Approved token spending';
};

const Action = ({ type, targetAddress }) => {
  return (
    <div className="activity-table-action">
      <div>{renderActionName(type)}</div>
      <span>
        <ZeroXAddress address={targetAddress} />
      </span>
    </div>
  );
};

Action.propTypes = {
  type: PropTypes.string.isRequired,
  targetAddress: PropTypes.string.isRequired
};

export default Action;
