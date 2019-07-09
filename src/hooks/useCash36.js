import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from '../providers/web3.provider';
import { UportSubprovider } from 'uport-connect';
import { network as networkUtils } from 'uport-transports';
import { transactionRequest } from '../helpers/uport.helpers';

const useCash36 = () => {
  const { networkId, web3 } = useContext(Web3Context);
  const { user } = useSelector(({ auth }) => auth);
  const [state] = useState({ networkId, web3 });

  useEffect(() => {
    if (user.useMetamask) return;

    const networksList = networkUtils.defaults.networks;
    const networkName = Object.keys(networksList).filter(
      key => networksList[key].id === `0x${networkId}`
    )[0];
    const network = networkUtils.config.network(networkName);

    const provider = new UportSubprovider({
      requestAddress: () => {
        console.warn('fetching uport address');
        return user.account;
      },
      sendTransaction: txObj => {
        delete txObj['from'];
        return transactionRequest({
          txObj,
          networkId: network.id,
          pushToken: user.pushToken,
          boxPub: user.boxPub
        });
      },
      provider: state.web3.givenProvider,
      network
    });

    state.web3.setProvider(provider);
  }, []);

  const transactionHashCallback = action => {
    return hash => {
      console.log('transactionHashCallback - ' + action);
      // this.props.dispatch(info(Messages.transactionSent(action)));
    };
  };

  const receiptCallback = action => {
    // return (receipt) => {
    console.log('receiptCallback - ' + action);
    // this.props.dispatch(success(Messages.transactionMined(action)));
    // };
  };

  const errorCallback = action => {
    return async err => {
      // this.props.dispatch(error(Messages.error(action, err.message)));
      console.log(`ERROR: ${err.message}`);
    };
  };

  return { ...state, transactionHashCallback, receiptCallback, errorCallback };
};

export default useCash36;
