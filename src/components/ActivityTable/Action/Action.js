import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';
import { Web3Context } from '../../../providers/web3.provider';
import CopyToClipboard from '../../CopyToClipboard';

import './Action.scss';

const renderActionName = type => {
  if (type === 'BUY') return 'New tokens created';
  if (type === 'SELL') return 'Sold tokens';
  if (type === 'SENT') return 'Tokens sent to';
  if (type === 'RECEIVED') return 'Received tokens';
  if (type === 'APPROVED') return 'Approved token spending';
  
};

const Action = ({ type, targetAddress, txHash }) => {
  const { networkId, network } = useContext(Web3Context);

  return (
    <div className="activity-table-action">
      <div>{renderActionName(type)}</div>
      <span>
        {txHash ? (
          <>
            <CopyToClipboard text={txHash} />
            <a
              href={`https://${
                network && networkId !== 1 ? `${network.toLowerCase()}.` : ''
              }etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TruncateString text={targetAddress} />
            </a>
          </>
        ) : (
          <TruncateString text={targetAddress} />
        )}
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
