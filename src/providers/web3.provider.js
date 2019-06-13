import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { WEB3_NODE } from '../config/api.js';

export const Web3Context = React.createContext();

const Web3Provider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [networkId, setNetworkId] = useState(null);
  const [network, setNetwork] = useState(null);
  const [networkError, setNetworkError] = useState(false);

  const initWeb3 = () => {
    let { web3 } = window;

    if (web3 !== undefined) {
      // Use Mist/MetaMask's provider.
      console.info(
        'Injected web3 detected. We will override web3 provider. Your plugin might not work anymore.'
      );
    }

    web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(WEB3_NODE));
    window.web3 = web3;

    console.info('web3 injected and ready. Connected to: ' + WEB3_NODE);
  };

  const getNetworkId = async () => {
    const { web3 } = window;

    try {
      const id = await web3.eth.net.getId();
      console.info('set network ' + id);
      setNetworkId(id);
      setNetwork(getNetwork(id));
      setLoading(false);
      return id;
    } catch (error) {
      console.info('Error: web3 not available ' + error);
      setNetworkError(true);
      setLoading(false);
      return null;
    }
  };

  const getNetwork = networkId => {
    switch (networkId) {
      case 1:
        return 'MainNet';
      case 2:
        return 'Morden';
      case 3:
        return 'Ropsten';
      case 4:
        return 'Rinkeby';
      case 85588558:
        return 'Local';
      case 10:
        return 'DEV';
      default:
        return 'unknown';
    }
  };

  useEffect(() => {
    initWeb3();
    getNetworkId();
  }, []);

  if (loading) {
    return <div className="loading-full">Connecting to Ethereum node...</div>;
  }

  if (networkError) {
    return <div className="error-full">Error connecting to Ethereum node!</div>;
  }

  return (
    <Web3Context.Provider value={{ network, networkId, web3: window.web3 }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
