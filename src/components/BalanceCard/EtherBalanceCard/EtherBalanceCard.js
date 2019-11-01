import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { Web3Context } from '../../../providers/web3.provider';
import BalanceCard from '../BalanceCard';

const EtherBalanceCard = ({ walletAddress }) => {
  const [balance, setBalance] = useState(0);

  const { utils, eth } = useContext(Web3Context);

  const getBalance = async () => {
    try {
      let balance;

      balance = await eth.getBalance(walletAddress);
      balance = await utils.fromWei(balance, 'ether');

      setBalance(Number(balance));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [walletAddress]);

  return <BalanceCard name="Ether" symbol="ETHER" balance={balance} />;
};

EtherBalanceCard.propTypes = {
  walletAddress: PropTypes.string.isRequired
};

export default EtherBalanceCard;
