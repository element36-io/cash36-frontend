import { useContext, useEffect, useState } from 'react';

import { Web3Context } from '../providers/web3.provider';

export default (walletAddress, type = 'ether') => {
  const { utils, eth } = useContext(Web3Context);
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    try {
      let balance;
      balance = await eth.getBalance(walletAddress);
      balance = await utils.fromWei(balance, type);

      setBalance(Number(balance));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [walletAddress]);

  return balance;
};
