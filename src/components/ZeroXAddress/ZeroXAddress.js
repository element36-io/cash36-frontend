import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinkIcon from '@material-ui/icons/ExitToAppOutlined';
import { Tooltip } from '@material-ui/core';

import { Web3Context } from '../../providers/web3.provider';
import Responsive from '../Responsive';
import CopyToClipboard from '../CopyToClipboard';

import './ZeroXAddress.scss';

const ZeroXAddress = ({
  address,
  truncated = false,
  contracts,
  contacts,
  wallets
}) => {
  const { network, networkId } = useContext(Web3Context);
  const [hoverText, setHoverText] = useState('');
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const contract = contracts.find(
      contract => contract.contractAddress === address
    );

    const contact = contacts.find(
      contact => contact.contactAddress === address
    );

    const me = wallets.find(wallet => wallet.accountAddress === address);

    if (me) {
      setHoverText(me.shortDescription);
    } else if (contract) {
      setHoverText(contract.name);
    } else if (contract) {
      setHoverText(contact.contactName);
    }
  }, []);

  return (
    <div
      className="zerox-address"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {isHover && hoverText && (
        <div className="zerox-address__hovered">{hoverText}</div>
      )}
      <Responsive>
        <CopyToClipboard text={address} showAsText truncated={truncated} />
      </Responsive>
      <Responsive isMobile>
        <CopyToClipboard text={address} showAsText truncated />
      </Responsive>
      <Tooltip title="See on Etherscan">
        <a
          href={`https://${
            network && networkId !== 1 ? `${network.toLowerCase()}.` : ''
          }etherscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon />
        </a>
      </Tooltip>
    </div>
  );
};

ZeroXAddress.propTypes = {
  address: PropTypes.string,
  truncated: PropTypes.bool,
  contracts: PropTypes.array,
  contacts: PropTypes.array,
  wallets: PropTypes.array
};

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contactsList,
    wallets: state.wallets.walletList,
    contracts: state.contracts.contracts
  };
};

export default connect(mapStateToProps)(ZeroXAddress);

// {
//   /* <a

// target="_blank"
// rel="noopener noreferrer"
// > */
// }

// const { networkId, network } = useContext(Web3Context);
