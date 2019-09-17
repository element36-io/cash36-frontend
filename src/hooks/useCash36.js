import { useState, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from '../providers/web3.provider';
import E36Provider from '../helpers/e36.provider';

const useCash36 = () => {
  const _isMounted = useRef(true);
  const { networkId, web3 } = useContext(Web3Context);
  const [state] = useState({ networkId, web3 });
  const { user } = useSelector(({ auth }) => auth);

  const isActive = () => {
    return _isMounted.current;
  };

  const setProvider = () => {
    if (!user && !user.useMetamask) return;

    console.warn(user);
    const { account, pushToken, boxPub } = user;
    console.warn('========== useCash36');
    console.warn(web3);
    console.warn(pushToken);

    const provider = new E36Provider({
      networkId,
      account,
      pushToken,
      boxPub,
      cancel: () => !isActive()
    });

    state.web3.setProvider(provider);
  };

  useEffect(() => {
    setProvider();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return { ...state };
};

export default useCash36;
