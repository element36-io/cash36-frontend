import { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from '../providers/web3.provider';
import { uPort } from '../config/uport.config';

const useCash36 = () => {
  const { networkId, web3 } = useContext(Web3Context);
  const { user } = useSelector(({ auth }) => auth);
  const [state] = useState({ networkId, web3 });

  useEffect(() => {
    if (!user.useMetamask) state.web3.setProvider(uPort.getProvider());
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
