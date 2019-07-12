import { useState, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from '../providers/web3.provider';
import E36Provider from '../helpers/e36.provider';
// import { transactionRequest } from '../helpers/uport.helpers';
// import { UportSubprovider } from 'uport-connect';
// import { network as networkUtils } from 'uport-transports';

const useCash36 = () => {
  const { networkId, web3 } = useContext(Web3Context);
  const _isMounted = useRef(true);
  const {
    user: { useMetamask, account, pushToken, boxPub }
  } = useSelector(({ auth }) => auth);
  const [state] = useState({ networkId, web3 });

  const isActive = () => {
    return _isMounted.current;
  };

  useEffect(() => {
    if (useMetamask) return;

    const provider = new E36Provider({
      networkId,
      account,
      pushToken,
      boxPub,
      isActive
    });

    // const networksList = networkUtils.defaults.networks;
    // const networkName = Object.keys(networksList).filter(
    //   key => networksList[key].id === `0x${networkId}`
    // )[0];
    // const network = networkUtils.config.network(networkName);

    // const uportProvider = new UportSubprovider({
    //   requestAddress: () => {
    //     console.warn('fetching uport address');
    //     return account;
    //   },
    //   sendTransaction: txObj => {
    //     delete txObj['from'];
    //     return transactionRequest({
    //       txObj,
    //       networkId: network.id,
    //       pushToken: pushToken,
    //       boxPub: boxPub
    //     });
    //   },
    //   network
    // });

    // console.warn(uportProvider);

    state.web3.setProvider(provider);

    return () => {
      _isMounted.current = false;
    };
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
