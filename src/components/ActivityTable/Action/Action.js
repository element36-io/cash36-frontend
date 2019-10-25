import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TruncateString from 'react-truncate-string';
import { Web3Context } from '../../../providers/web3.provider';

import './Action.scss';

const networkUrls = {
  1: '',
  2: 'morden.',
  3: 'ropsten.',
  4: 'rinkeby.',
  85588558: 'Local.'
};

const renderActionName = type => {
  if (type === 'BUY') return 'Bought Tokens';
  if (type === 'SELL') return 'Sold Tokens';
  if (type === 'SENT') return 'Sent to';
  if (type === 'RECEIVED') return 'Bought Tokens';
};

const Action = ({ type, targetAddress, txHash }) => {
  const { networkId } = useContext(Web3Context);

  return (
    <div className="activity-table-action">
      <div>{renderActionName(type)}</div>
      <span>
        {txHash ? (
          <a
            href={`https://${networkUrls[networkId]}etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TruncateString text={targetAddress} />
          </a>
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
