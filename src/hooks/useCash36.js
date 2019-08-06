import { useState, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from '../providers/web3.provider';
import E36Provider from '../helpers/e36.provider';

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
      cancel: () => !isActive()
    });

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
