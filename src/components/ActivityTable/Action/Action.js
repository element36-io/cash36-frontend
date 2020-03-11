import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';
import { Web3Context } from '../../../providers/web3.provider';
import CopyToClipboard from '../../CopyToClipboard';
import ZeroXAddress from '../../ZeroXAddress';

import './Action.scss';

const renderActionName = type => {
  if (type === 'BUY') return 'New tokens created';
  if (type === 'SELL') return 'Sold tokens';
  if (type === 'SENT') return 'Tokens sent to';
  if (type === 'RECEIVED') return 'Received tokens';
  if (type === 'APPROVED') return 'Approved token spending';
};

const Action = ({ type, targetAddress, txHash }) => {
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
  txHash: PropTypes.string,
  targetAddress: PropTypes.string.isRequired
};

export default Action;
