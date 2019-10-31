import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { WEB3_NODE } from '../config/api';

export const Web3Context = React.createContext();

const Web3Provider = ({ children, user }) => {
  const [loading, setLoading] = useState(true);
  const [networkId, setNetworkId] = useState(null);
  const [network, setNetwork] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [web3Obj] = useState(new Web3());

  const initWeb3 = () => {
    let { ethereum } = window;
    let web3js;

    if (ethereum !== undefined) {
      // Use Mist/MetaMask's provider.
      web3js = new Web3(ethereum);
      console.info(
        'Injected web3 detected. We will override web3 provider. Your plugin might not work anymore.'
      );
    } else {
      web3js = new Web3(WEB3_NODE);
    }

    window.web3 = web3js;
  };

  const getNetworkId = async () => {
    const { web3 } = window;

    try {
      const id = await web3.eth.net.getId();
      setNetworkId(id);
      setNetwork(getNetwork(id));
      setLoading(false);
      setNetworkError(null);
      return id;
    } catch (error) {
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
      case 85588558:
        return 'Local';
      case 10:
        return 'DEV';
      default:
        return 'unknown';
    }
  };

  //
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
        web3: window.web3,
        getNetwork,
        utils: web3Obj.utils
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
