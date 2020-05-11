import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { WEB3_NODE } from '../config/api';

export const Web3Context = React.createContext();

const web3 = new Web3(WEB3_NODE);

const Web3Provider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [networkId, setNetworkId] = useState(null);
  const [network, setNetwork] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [web3js, setWeb3js] = useState(web3);

  const initWeb3 = () => {
    let { ethereum } = window;

    if (ethereum !== undefined) {
      // Use Mist/MetaMask's provider.
      setWeb3js(new Web3(ethereum));
      console.info(
        'Injected web3 detected. We will override web3 provider. Your plugin might not work anymore.'
      );
    } else { 
      console.info(
        'NO  web3 detected. '
      );
      setWeb3js(web3);
    }

    window.web3 = web3js;
  };

  const getNetworkId = async () => {
    console.info(
      'get networkid called');
    const { web3 } = window;

    try {
      const id = await web3.eth.getChainId();//web3.version.network;//await web3.eth.net.getId();
      setNetworkId(id);  
      setNetwork(getNetwork(id));
      setLoading(false);
      setNetworkError(null);
      return id;
    } catch (error) {
      console.error(error)
      setNetworkError(
        `Network error: web3 not available ${error.message.replace('\\n', '')}`
      );
      setLoading(false);
      return null;
    }
  };

  const getNetwork = networkId => {
    switch (parseInt(networkId)) {
      case 1:
        return 'MainNet';
      case 2:
        return 'Morden';
      case 3:
        return 'Ropsten';
      case 4:
        return 'Rinkeby';
      case 5:
        return 'Goerli';
      case 85458545:
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

  // useEffect(() => {
  //   if (user) window.web3.test = 'TEST';
  // }, [user.wallet]);

  return (
    <Web3Context.Provider
      value={{
        network,
        networkId,
        networkError,
        loading,
        web3: web3js,
        getNetwork,
        utils: web3js.utils,
        eth: web3js.eth
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Web3Provider);
