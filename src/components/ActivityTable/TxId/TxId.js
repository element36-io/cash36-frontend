import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import LinkIcon from '@material-ui/icons/ExitToAppOutlined';
import { Tooltip } from '@material-ui/core';
import { Web3Context } from '../../../providers/web3.provider';

import './TxId.scss';

const TxId = ({ txHash }) => {
  const { network, networkId } = useContext(Web3Context);


  return (
    <div className="tx-id">
      <Tooltip title="See transaction log on etherscan">
        <a
          href={`https://${
            network && networkId !== 1 ? `${network.toLowerCase()}.` : ''
          }etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon />
        </a>
      </Tooltip>
    </div>
  );
  
};

TxId.propTypes = {
  txHash: PropTypes.string
};

export default TxId;
