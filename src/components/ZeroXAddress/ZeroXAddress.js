import React from 'react';
import PropTypes from 'prop-types';

import CopyToClipboard from '../CopyToClipboard';

const ZeroXAddress = ({ address, truncated = false }) => {
  return <CopyToClipboard text={address} showAsText truncated={truncated} />;
};

ZeroXAddress.propTypes = {
  address: PropTypes.string,
  truncated: PropTypes.bool
};

export default ZeroXAddress;

// {
//   /* <a
// href={`https://${
//   network && networkId !== 1 ? `${network.toLowerCase()}.` : ''
// }etherscan.io/tx/${txHash}`}
// target="_blank"
// rel="noopener noreferrer"
// > */
// }

// const { networkId, network } = useContext(Web3Context);
